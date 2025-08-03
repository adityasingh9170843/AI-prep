import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Info,
  Brain,
  MessageCircle,
  Target,
  Clock,
  Sparkles,
  BookOpen,
  TrendingUp,
  Zap,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

function InterviewPrep() {
  const { sId } = useParams();
  const [sessionData, setSessionData] = useState(null);
  const [selectedExplanation, setSelectedExplanation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const fetchSessionById = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/session/${sId}`, {
        withCredentials: true,
      });
      setSessionData(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  const generateExplanation = async (question) => {
    setLoading(true);
    setSelectedExplanation(null); // Clear previous explanation
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/ai/generate-explanation`,
        { question },
        { withCredentials: true }
      );
      setSelectedExplanation(res.data.parsed);
    } catch (err) {
      console.error("Explanation Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessionById();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-4">
        <div className="flex items-center">
          <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 animate-spin text-purple-500 mr-2" />
          <p className="text-base sm:text-lg font-semibold text-gray-700">
            Preparing your session...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Brain className="absolute top-20 left-10 w-16 h-16 sm:w-32 sm:h-32 text-blue-100/30 transform rotate-12" />
        <MessageCircle className="absolute top-40 right-20 w-12 h-12 sm:w-24 sm:h-24 text-purple-100/40 transform -rotate-12" />
        <Target className="absolute bottom-40 left-20 w-14 h-14 sm:w-28 sm:h-28 text-indigo-100/30 transform rotate-45" />
        <Sparkles className="absolute top-60 left-1/3 w-10 h-10 sm:w-20 sm:h-20 text-pink-100/40 transform -rotate-12" />
        <Zap className="absolute bottom-20 right-10 w-18 h-18 sm:w-36 sm:h-36 text-yellow-100/30 transform rotate-12" />
        <BookOpen className="absolute top-10 right-1/3 w-12 h-12 sm:w-24 sm:h-24 text-green-100/30 transform rotate-45" />
        <TrendingUp className="absolute bottom-60 right-1/3 w-10 h-10 sm:w-20 sm:h-20 text-blue-100/40 transform -rotate-45" />

        <div className="absolute top-1/4 left-1/4 w-20 h-20 sm:w-40 sm:h-40 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-28 h-28 sm:w-56 sm:h-56 bg-gradient-to-br from-indigo-200/20 to-pink-200/20 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 right-1/5 w-16 h-16 sm:w-32 sm:h-32 bg-gradient-to-br from-emerald-200/20 to-blue-200/20 rounded-full blur-xl"></div>

        <svg
          className="absolute inset-0 w-full h-full opacity-10"
          viewBox="0 0 1000 1000"
        >
          <path
            d="M100,200 Q300,100 500,200 T900,200"
            stroke="url(#gradient1)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M200,800 Q400,700 600,800 T800,800"
            stroke="url(#gradient2)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M100,500 Q200,300 400,500 Q600,700 900,500"
            stroke="url(#gradient3)"
            strokeWidth="1.5"
            fill="none"
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="p-2 sm:p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl sm:rounded-2xl shadow-lg">
              <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                AI Interview Preparation
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                Master your skills with AI-powered practice
              </p>
            </div>
          </div>
          <div className="w-full sm:w-auto">
            <Link to={`/interview-prep/${sId}/StartAQuiz`}>
              <Button className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:from-indigo-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-medium text-sm sm:text-base">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Start a Quiz
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="w-full lg:w-1/2 space-y-6">
            <Card className="relative overflow-hidden rounded-2xl sm:rounded-3xl border-0 bg-white/80 backdrop-blur-sm shadow-lg">
              <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-bl from-indigo-100/60 to-transparent rounded-full transform translate-x-4 -translate-y-4"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-tr from-purple-100/60 to-transparent rounded-full transform -translate-x-2 translate-y-2"></div>

              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

              <CardHeader className="relative z-10 p-4 sm:p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
                    <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {sessionData.role}
                  </CardTitle>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <p className="text-sm sm:text-base text-gray-600 font-medium">
                    {sessionData.experience} Years Experience
                  </p>
                </div>
              </CardHeader>

              <CardContent className="relative z-10 space-y-4 p-4 sm:p-6 pt-0">
                <div className="flex items-start space-x-3">
                  <Target className="w-5 h-5 text-indigo-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-700 text-sm sm:text-base">Focus Areas</p>
                    <p className="text-sm sm:text-base text-gray-600">{sessionData.topicsToFocus}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MessageCircle className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-700 text-sm sm:text-base">Session Goal</p>
                    <p className="text-sm sm:text-base text-gray-600">{sessionData.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

           
            <Card className="relative overflow-hidden rounded-2xl sm:rounded-3xl border-0 bg-white/80 backdrop-blur-sm shadow-lg">
              <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-bl from-purple-100/60 to-transparent rounded-full transform translate-x-4 -translate-y-4"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-tr from-indigo-100/60 to-transparent rounded-full transform -translate-x-2 translate-y-2"></div>

              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500" />

              <CardContent className="relative z-10 p-4 sm:p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
                    <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Interview Questions
                  </h3>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  {sessionData.questions.map((q, index) => (
                    <AccordionItem
                      key={q._id}
                      value={q._id}
                      className="border-b border-gray-200/50"
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                        <AccordionTrigger className="flex-1 text-left hover:text-indigo-600 transition-colors duration-200 py-4 text-sm sm:text-base">
                          <span className="font-medium pr-2">
                            Q{index + 1}: {q.question}
                          </span>
                        </AccordionTrigger>
                        <Button
                          variant="ghost"
                          onClick={() => generateExplanation(q.question)}
                          className="ml-0 sm:ml-2 px-3 py-2 text-xs sm:text-sm font-medium hover:bg-indigo-100 hover:text-indigo-600 transition-all duration-200 rounded-lg flex items-center gap-2 self-start sm:self-center"
                        >
                          <Info className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="hidden sm:inline">Generate Explanation</span>
                          <span className="sm:hidden">Explain</span>
                        </Button>
                      </div>
                      <AccordionContent className="pb-4">
                        <div className="bg-gradient-to-r from-gray-50/80 to-blue-50/80 p-3 sm:p-4 rounded-xl border border-gray-200/50 backdrop-blur-sm">
                          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                            {q.answer}
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {(loading || selectedExplanation) && (
            <div className="w-full lg:w-1/2">
              <Card className="relative overflow-hidden rounded-2xl sm:rounded-3xl border-0 bg-white/80 backdrop-blur-sm shadow-lg min-h-[300px] sm:min-h-[400px]">
                <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-bl from-pink-100/60 to-transparent rounded-full transform translate-x-4 -translate-y-4"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-tr from-indigo-100/60 to-transparent rounded-full transform -translate-x-2 translate-y-2"></div>

                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500" />

                <CardContent className="relative z-10 p-4 sm:p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl">
                      <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                      AI Explanation
                    </h3>
                  </div>

                  {loading ? (
                    <div className="space-y-4">
                      <div className="h-4 sm:h-6 w-3/4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-xl animate-pulse"></div>
                      <div className="h-24 sm:h-32 w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-xl animate-pulse"></div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 leading-tight">
                        {selectedExplanation.title}
                      </h4>
                      <div className="bg-gradient-to-r from-blue-50/80 to-purple-50/80 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-200/50 backdrop-blur-sm">
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                          {selectedExplanation.explanation}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InterviewPrep;