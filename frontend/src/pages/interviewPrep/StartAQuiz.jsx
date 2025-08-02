import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Sparkles, BookOpen, Eye, EyeOff } from "lucide-react";

function StartAQuiz() {
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [showAnswers, setShowAnswers] = useState([]);
  const [role, setRole] = useState(null);

  const { sId } = useParams();

  const getSessionById = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/session/${sId}`, {
        withCredentials: true,
      });
      setSessionData(res.data);
      setRole(res.data.role);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  const generateQuiz = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/ai/generate-quiz`,
        { role },
        { withCredentials: true }
      );
      setQuestions(response.data);
      setShowAnswers(new Array(response.data.length).fill(false));
      console.log("Generated questions:", response.data);
    } catch (error) {
      console.error("Quiz Generation Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSessionById();
  }, []);

  useEffect(() => {
    if (role) {
      generateQuiz();
    }
  }, [role]);

  const toggleAnswer = (index) => {
    setShowAnswers((prev) => prev.map((val, i) => (i === index ? !val : val)));
  };

  if (loading || !sessionData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
        <Sparkles className="w-10 h-10 animate-spin text-purple-500 mr-2" />
        <p className="text-lg font-semibold text-gray-700">
          Generating Quiz...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-8">
      {/* Header Card */}
      <Card className="mb-8 shadow-xl border-none bg-white/80 backdrop-blur-md rounded-3xl">
        <CardHeader className="flex flex-row items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Quiz for {sessionData.role}
              </h1>
              <p className="text-gray-600 mt-1">
                {sessionData.experience} years experience —{" "}
                {sessionData.description}
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Quiz Questions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {questions.map((q, index) => (
          <Card
            key={index}
            className="bg-white/80 backdrop-blur-md shadow-lg border-none rounded-3xl"
          >
            <CardHeader className="border-b">
              <div className="flex items-center space-x-3">
                <BookOpen className="text-indigo-500 w-6 h-6" />
                <CardTitle className="text-xl font-semibold text-gray-800">
                  Q{index + 1}: {q.question}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                {Object.entries(q.options).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-start gap-2 p-3 bg-white border border-gray-200 rounded-xl shadow-sm"
                  >
                    <span className="font-semibold text-indigo-600">
                      {key}.
                    </span>
                    <span className="text-gray-800">{value}</span>
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                className="text-sm font-medium flex items-center gap-2"
                onClick={() => toggleAnswer(index)}
              >
                {showAnswers[index] ? (
                  <>
                    <EyeOff className="w-4 h-4" />
                    Hide Answer
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4" />
                    Show Answer
                  </>
                )}
              </Button>

              {showAnswers[index] && (
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-xl border border-gray-200 text-gray-700">
                  <strong>Correct Answer:</strong> {q.answer} -{" "}
                  {q.options[q.answer]}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default StartAQuiz;
