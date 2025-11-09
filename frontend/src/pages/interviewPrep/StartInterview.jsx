import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Volume2, Mic, MicOff } from "lucide-react";
import { GoogleGenAI } from "@google/genai";

function StartInterview() {
  const { sId } = useParams();
  const [sessionData, setSessionData] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [storedTranscript, setStoredTranscript] = useState(""); // This will NEVER get lost
  const [currentSession, setCurrentSession] = useState(""); // Current recording session
  const [aiResponse, setAiResponse] = useState("");
  const [isWebCamOn, setIsWebCamOn] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const lastResultRef = useRef("");
  
  // New states for scorecard functionality
  const [answersByQuestion, setAnswersByQuestion] = useState({}); // Store answers per question
  const [scorecardResponse, setScorecardResponse] = useState(""); // Consolidated scorecard
  const [isGeneratingScorecard, setIsGeneratingScorecard] = useState(false);

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: true,
    crossBrowser: true,
  });

  // Fetch session
  useEffect(() => {
    const fetchSessionById = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/session/${sId}`, {
          withCredentials: true,
        });
        setSessionData(res.data);
        setActiveQuestion(res.data.questions?.[0]?.question || null);
      } catch (err) {
        console.error("Fetch Error:", err);
      }
    };
    fetchSessionById();
  }, [sId]);

  // Continuously capture and store speech results
  useEffect(() => {
    let fullText = "";
    
    // Get all results and combine them
    results.forEach(result => {
      if (result?.transcript) {
        fullText += result.transcript + " ";
      }
    });
    
    // Add interim result if recording
    if (isRecording && interimResult) {
      fullText += interimResult;
    }
    
    // Update current session
    setCurrentSession(fullText.trim());
    
    // Store in permanent transcript whenever we get new results
    if (fullText.trim() && fullText.trim() !== lastResultRef.current) {
      setStoredTranscript(fullText.trim());
      lastResultRef.current = fullText.trim();
    }
  }, [results, interimResult, isRecording]);

  // Handle start recording
  const handleStartRecording = () => {
    console.log("Starting recording...");
    setCurrentSession("");
    setAiResponse("");
    startSpeechToText();
  };

  // Handle stop recording - FORCE save whatever we have
  const handleStopRecording = () => {
    console.log("Stopping recording...");
    stopSpeechToText();
    
    // Force save whatever we have right now
    const finalText = currentSession || interimResult || "";
    if (finalText.trim()) {
      setStoredTranscript(finalText.trim());
      
      // Save answer for the current question
      if (activeQuestion) {
        setAnswersByQuestion(prev => ({
          ...prev,
          [activeQuestion]: finalText.trim()
        }));
        console.log("Saved answer for question:", activeQuestion);
      }
      
      console.log("Saved transcript:", finalText.trim());
    }
    
    // Clear current session
    setCurrentSession("");
  };

  // Get what to display on screen
  const getDisplayText = () => {
    if (isRecording) {
      return currentSession || interimResult || "Listening...";
    }
    return storedTranscript || "No transcript yet. Start recording to speak.";
  };

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  const callGemini = async () => {
    const textToSend = storedTranscript.trim();
    
    if (!textToSend || !activeQuestion) {
      alert("No transcript available or no question selected!");
      return;
    }

    setIsProcessing(true);
    console.log("Sending to Gemini:", textToSend);

    const prompt = `
      Question: "${activeQuestion}"
      User Answer: "${textToSend}"
      Please compare the user's answer to the correct answer and provide a rating (1-10) and feedback.
      Return result in plain text.
    `;

    try {
      const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY;
      if (!GEMINI_KEY) {
        console.error("VITE_GEMINI_API_KEY is not set in your environment.");
        setAiResponse(
          "Gemini API key is missing. Set VITE_GEMINI_API_KEY in frontend/.env and restart the dev server."
        );
        setIsProcessing(false);
        return;
      }

      const ai = new GoogleGenAI({
        apiKey: GEMINI_KEY,
      });

      const response = await ai.models.generateContent({
        contents: prompt,
        model: "gemini-2.0-flash",
        temperature: 0.7,
      });

      const responseText = response.text || "No response received";
      setAiResponse(responseText);
    } catch (err) {
      console.error("Gemini API Error:", err);
      setAiResponse("Error occurred while getting feedback. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Clear transcript manually
  const clearTranscript = () => {
    setStoredTranscript("");
    setCurrentSession("");
    setAiResponse("");
  };

  // Save current answer to the active question
  const saveCurrentAnswer = () => {
    if (!storedTranscript.trim() || !activeQuestion) {
      alert("No transcript or question selected!");
      return;
    }
    
    setAnswersByQuestion(prev => ({
      ...prev,
      [activeQuestion]: storedTranscript.trim()
    }));
    
    alert(`Answer saved for: "${activeQuestion}"`);
  };

  // Generate consolidated scorecard from all answers
  const generateScorecard = async () => {
    if (!sessionData?.questions?.length) {
      alert("Session questions not loaded yet.");
      return;
    }

    // Get all answered questions
    const answeredQuestions = sessionData.questions.filter(q => 
      answersByQuestion[q.question]?.trim()
    );

    if (answeredQuestions.length === 0) {
      alert("No answers recorded yet. Please answer at least one question.");
      return;
    }

    setIsGeneratingScorecard(true);
    setScorecardResponse("");

    // Build the prompt with all Q&A pairs
    const qaPrompt = answeredQuestions.map((q, idx) => `
Question ${idx + 1}: ${q.question}
Expected Answer: ${q.answer || "Not provided"}
User's Answer: ${answersByQuestion[q.question]}
---`).join("\n");

    const prompt = `You are an AI technical interviewer evaluating a candidate's interview performance.

Below are ${answeredQuestions.length} questions with the user's spoken answers:

${qaPrompt}

Please provide a CONSOLIDATED SCORECARD with:

1. **Individual Question Scores**: For each question, provide:
   - Question number and brief title
   - Score out of 10
   - 2-3 sentences of feedback

2. **Overall Performance**:
   - Overall average score
   - Key strengths (3-4 bullet points)
   - Areas for improvement (3-4 bullet points)

3. **Final Recommendation**: Hire/Consider/Reject with reasoning

Use clear, professional language. Format in plain text with sections clearly marked.`;

    try {
      const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY;
      if (!GEMINI_KEY) {
        console.error("VITE_GEMINI_API_KEY is not set in your environment.");
        setScorecardResponse(
          "Gemini API key is missing. Set VITE_GEMINI_API_KEY in frontend/.env and restart the dev server."
        );
        setIsGeneratingScorecard(false);
        return;
      }

      const ai = new GoogleGenAI({
        apiKey: GEMINI_KEY,
      });

      const response = await ai.models.generateContent({
        contents: prompt,
        model: "gemini-2.0-flash",
        temperature: 0.7,
      });

      const responseText = response.text || "No scorecard received";
      setScorecardResponse(responseText);
    } catch (err) {
      console.error("Scorecard Generation Error:", err);
      setScorecardResponse("Error generating scorecard. Please try again.");
    } finally {
      setIsGeneratingScorecard(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center">

        {/* Webcam */}
        <div className="mb-6">
          {isWebCamOn ? (
            <Webcam
              audio={false}
              className="rounded-2xl shadow-lg w-[450px] h-[300px] object-cover border-4 border-indigo-200"
            />
          ) : (
            <div className="w-[450px] h-[300px] bg-gray-200 flex items-center justify-center rounded-2xl text-gray-600 font-medium">
              Webcam Disabled
            </div>
          )}
        </div>

        {/* Questions Tabs */}
        {sessionData && (
          <Tabs defaultValue={sessionData.questions[0]?.question} className="w-full max-w-3xl">
            <TabsList className="grid grid-cols-3 w-full bg-indigo-100 rounded-xl p-1">
              {sessionData.questions.map((q, idx) => (
                <TabsTrigger
                  key={idx}
                  value={q.question}
                  onClick={() => {
                    setActiveQuestion(q.question);
                    // Don't clear transcript when switching questions
                  }}
                  className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white rounded-lg transition"
                >
                  Q{idx + 1}
                </TabsTrigger>
              ))}
            </TabsList>

            {sessionData.questions.map((q, idx) => (
              <TabsContent
                key={idx}
                value={q.question}
                className="p-6 bg-gray-50 rounded-xl shadow-inner mt-4"
              >
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-gray-800">{q.question}</p>
                  <Button variant="ghost" size="icon" onClick={() => speakText(q.question)}>
                    <Volume2 className="h-5 w-5" />
                  </Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}

        {/* Controls */}
        <div className="mt-4 flex gap-4 flex-wrap justify-center">
          <Button
            onClick={isRecording ? handleStopRecording : handleStartRecording}
            className={`px-6 py-2 rounded-xl flex items-center gap-2 ${
              isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-indigo-500 hover:bg-indigo-600'
            } text-white`}
            disabled={isProcessing}
          >
            {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            {isRecording ? "Stop Recording" : "Start Recording"}
          </Button>

          <Button
            onClick={callGemini}
            disabled={!storedTranscript.trim() || isProcessing}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl"
          >
            {isProcessing ? "Sending..." : "Send to Gemini AI"}
          </Button>

          <Button
            onClick={saveCurrentAnswer}
            disabled={!storedTranscript.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl"
          >
            Save Answer
          </Button>

          <Button
            onClick={generateScorecard}
            disabled={isGeneratingScorecard || Object.keys(answersByQuestion).length === 0}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl font-semibold"
          >
            {isGeneratingScorecard ? "Generating..." : "📊 Generate Scorecard"}
          </Button>

          <Button
            onClick={clearTranscript}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-xl"
          >
            Clear Transcript
          </Button>
        </div>

        {/* Recording Status */}
        <div className="mt-3">
          {isRecording && (
            <div className="text-red-600 font-medium flex items-center gap-2">
              <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
              🎤 Recording... Speak now
            </div>
          )}
          {!isRecording && storedTranscript && (
            <div className="text-green-600 font-medium">
              ✅ Transcript saved and ready to send
            </div>
          )}
          {Object.keys(answersByQuestion).length > 0 && (
            <div className="text-purple-600 font-medium mt-2">
              📝 {Object.keys(answersByQuestion).length} answer(s) saved for scorecard
            </div>
          )}
        </div>

        {/* MAIN TRANSCRIPT DISPLAY - This is what you'll see */}
        <div className="mt-6 w-full max-w-2xl">
          {/* Stored Transcript - Always Visible */}
          <div className="bg-white border-2 border-blue-300 rounded-xl shadow p-4 mb-4">
            <h2 className="text-lg font-bold mb-2 text-blue-800">📝 SAVED TRANSCRIPT</h2>
            <div className="min-h-[80px] p-3 bg-blue-50 rounded border">
              <p className="text-gray-800 text-base">
                {storedTranscript || "Your transcript will appear here after recording..."}
              </p>
            </div>
            {storedTranscript && (
              <div className="mt-2 text-sm text-blue-600">
                ✓ {storedTranscript.split(' ').filter(w => w.length > 0).length} words saved
              </div>
            )}
          </div>

          {/* Live Recording Display */}
          {isRecording && (
            <div className="bg-red-50 border-2 border-red-300 rounded-xl shadow p-4">
              <h2 className="text-lg font-bold mb-2 text-red-800">🔴 LIVE RECORDING</h2>
              <div className="min-h-[60px] p-3 bg-red-100 rounded border">
                <p className="text-gray-800">
                  {currentSession || interimResult || "Listening..."}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Gemini Response */}
        {(aiResponse || isProcessing) && (
          <div className="mt-6 w-full max-w-2xl bg-green-50 border-2 border-green-300 rounded-xl shadow p-4">
            <h2 className="text-lg font-bold mb-2 text-green-800">🤖 AI FEEDBACK</h2>
            {isProcessing ? (
              <div className="flex items-center gap-2 p-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-600"></div>
                <span className="text-gray-600">Getting AI feedback...</span>
              </div>
            ) : (
              <div className="p-3 bg-green-100 rounded border">
                <p className="text-gray-800 whitespace-pre-wrap">{aiResponse}</p>
              </div>
            )}
          </div>
        )}

        {/* Consolidated Scorecard */}
        {(scorecardResponse || isGeneratingScorecard) && (
          <div className="mt-6 w-full max-w-2xl bg-purple-50 border-2 border-purple-300 rounded-xl shadow p-4">
            <h2 className="text-lg font-bold mb-2 text-purple-800">📊 CONSOLIDATED SCORECARD</h2>
            {isGeneratingScorecard ? (
              <div className="flex items-center gap-2 p-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
                <span className="text-gray-600">Evaluating all answers...</span>
              </div>
            ) : (
              <div className="p-3 bg-purple-100 rounded border max-h-[500px] overflow-y-auto">
                <p className="text-gray-800 whitespace-pre-wrap">{scorecardResponse}</p>
              </div>
            )}
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mt-4 w-full max-w-2xl p-4 bg-red-100 border border-red-300 rounded-xl">
            <p className="text-red-700">❌ Speech Error: {error}</p>
          </div>
        )}

        {/* Debug Info */}
        <div className="mt-4 text-xs text-gray-500 max-w-2xl">
          Debug: Recording={isRecording.toString()}, Results={results.length}, 
          StoredLength={storedTranscript.length}, CurrentLength={currentSession.length}
        </div>
      </div>
    </div>
  );
}

export default StartInterview;