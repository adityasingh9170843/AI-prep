import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Webcam from "react-webcam";
import {
  Brain,
  Sparkles,
  WebcamIcon,
  User,
  Clock,
  Target,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

function MockInterview() {
  const { sId } = useParams();
  const [isWebCamOn, setIsWebCamOn] = useState(false);
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSessionById = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/session/${sId}`,
        {
          withCredentials: true,
        }
      );
      setSessionData(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessionById();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-4">
        <div className="flex items-center">
          <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 animate-spin text-purple-500 mr-2" />
          <p className="text-base sm:text-lg font-semibold text-gray-700">
            Loading your mock interview...
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

        <div className="absolute top-1/4 left-1/4 w-20 h-20 sm:w-40 sm:h-40 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-28 h-28 sm:w-56 sm:h-56 bg-gradient-to-br from-indigo-200/20 to-pink-200/20 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
       
        <div className="flex items-center space-x-3 sm:space-x-4 mb-6 sm:mb-8">
          <div className="p-2 sm:p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl sm:rounded-2xl shadow-lg">
            <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Mock Interview
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Practice your interview skills in real time
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
         
          <div className="w-full lg:w-1/2 space-y-6">
            <Card className="relative overflow-hidden rounded-2xl sm:rounded-3xl border-0 bg-white/80 backdrop-blur-sm shadow-lg">
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
                    <p className="font-semibold text-gray-700 text-sm sm:text-base">
                      Focus Areas
                    </p>
                    <p className="text-sm sm:text-base text-gray-600">
                      {sessionData.topicsToFocus}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MessageCircle className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-700 text-sm sm:text-base">
                      Session Goal
                    </p>
                    <p className="text-sm sm:text-base text-gray-600">
                      {sessionData.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          
          <div className="w-full lg:w-1/2">
            <Card className="relative overflow-hidden rounded-2xl sm:rounded-3xl border-0 bg-white/80 backdrop-blur-sm shadow-lg min-h-[350px] flex flex-col items-center justify-center">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500" />
              <CardContent className="relative z-10 flex flex-col items-center justify-center w-full h-full space-y-6 p-6">
                {isWebCamOn ? (
                  <Webcam
                    className="rounded-xl shadow-md border border-gray-200 w-full max-w-md"
                    onUserMedia={() => setIsWebCamOn(true)}
                    onUserMediaError={() => setIsWebCamOn(false)}
                  />
                ) : (
                  <div className="flex flex-col items-center space-y-3 text-gray-500">
                    <WebcamIcon className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400" />
                    <p className="text-sm sm:text-base">
                      Webcam is currently off
                    </p>
                  </div>
                )}
                <Button
                  onClick={() => setIsWebCamOn(!isWebCamOn)}
                  className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:from-indigo-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-medium text-sm sm:text-base"
                >
                  {isWebCamOn ? "Stop Camera" : "Start Camera"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MockInterview;
