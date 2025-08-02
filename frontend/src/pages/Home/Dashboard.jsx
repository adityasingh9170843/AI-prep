import React, { use, useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "@/context/userContext";
import { useNavigate } from "react-router-dom";
import {
  Trash2,
  Brain,
  MessageCircle,
  Target,
  Clock,
  Sparkles,
  Zap,
  User,
  BookOpen,
  TrendingUp,
  Loader,
} from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const userId = user?._id;

  const [sessions, setSessions] = useState([]);
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [targetRole, setTargetRole] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [topics, setTopics] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const fetchAllSessions = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/session/my-sessions`,
        { withCredentials: true }
      );
      console.log("seesions on db", response);
      setSessions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteSession = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/session/${id}`,
        { withCredentials: true }
      );
      console.log(response);
      fetchAllSessions();
    } catch (error) {
      console.error(error);
    }
  };

  const createNewSession = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/ai/generate-questions`,
        {
          role: targetRole,
          experience: yearsOfExperience,
          topicsToFocus: topics,
          numberOfQuestions: 10,
        },
        { withCredentials: true }
      );

      const generatedQuestions = response.data;
      console.log("Generated questions:", generatedQuestions);
      const response2 = await axios.post(
        `${import.meta.env.VITE_API_URL}/session/create`,
        {
          role: targetRole,
          experience: yearsOfExperience,
          topicsToFocus: topics,
          description: description,
          questions: generatedQuestions,
        },
        { withCredentials: true }
      );
      console.log(response2);
      if (response2?.data?._id) {
        navigate(`/interview-prep/${response2?.data?._id}`);
      }

      fetchAllSessions();
    } catch (error) {
      console.error("Error creating session:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchAllSessions();
  }, [userId]);

   useEffect(() => {
      const timer = setTimeout(() => {
        setInitialLoading(false);
      }, 2000);
  
      return () => clearTimeout(timer);
    }, []);

   if (initialLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
          <Sparkles className="w-10 h-10 animate-spin text-purple-500 mr-2" />
          <p className="text-lg font-semibold text-gray-700">
            Preparing your Dashboard...
          </p>
        </div>
      );
    }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        
        <Brain className="absolute top-20 left-10 w-32 h-32 text-blue-100/30 transform rotate-12" />
        <MessageCircle className="absolute top-40 right-20 w-24 h-24 text-purple-100/40 transform -rotate-12" />
        <Target className="absolute bottom-40 left-20 w-28 h-28 text-indigo-100/30 transform rotate-45" />
        <Sparkles className="absolute top-60 left-1/3 w-20 h-20 text-pink-100/40 transform -rotate-12" />
        <Zap className="absolute bottom-20 right-10 w-36 h-36 text-yellow-100/30 transform rotate-12" />
        <BookOpen className="absolute top-10 right-1/3 w-24 h-24 text-green-100/30 transform rotate-45" />
        <TrendingUp className="absolute bottom-60 right-1/3 w-20 h-20 text-blue-100/40 transform -rotate-45" />

        
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-gradient-to-br from-indigo-200/20 to-pink-200/20 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 right-1/5 w-32 h-32 bg-gradient-to-br from-emerald-200/20 to-blue-200/20 rounded-full blur-xl"></div>

       
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

      <div className="relative z-10 p-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Your AI Interview Sessions
              </h2>
              <p className="text-gray-600 mt-1">
                Prepare, Practice, Perfect with AI
              </p>
            </div>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:from-indigo-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-6 py-3 rounded-2xl font-medium">
                <Sparkles className="w-5 h-5 mr-2" />
                Create New Session
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl relative overflow-hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-100/50 to-transparent rounded-full transform translate-x-8 -translate-y-8"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-100/50 to-transparent rounded-full transform -translate-x-4 translate-y-4"></div>

              <DialogHeader className="relative z-10">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <DialogTitle className="font-extrabold text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Create New AI Session
                  </DialogTitle>
                </div>
                <DialogDescription className="text-sm text-gray-700 font-medium">
                  Configure your personalized AI interview experience and unlock
                  your potential
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-8 relative z-10">
                <div className="relative">
                  <Label className="text-gray-700 mb-4 flex items-center space-x-2">
                    <User className="w-4 h-4 text-indigo-500" />
                    <span>Target Role</span>
                  </Label>
                  <Input
                    value={targetRole}
                    required
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="bg-white/70 border-white/80 placeholder:text-gray-500 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 rounded-xl"
                    placeholder="e.g. Frontend Developer"
                  />
                </div>

                <div className="relative">
                  <Label className="text-gray-700 mb-4 flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-purple-500" />
                    <span>Years of Experience</span>
                  </Label>
                  <Input
                    type="number"
                    required
                    value={yearsOfExperience}
                    onChange={(e) => setYearsOfExperience(e.target.value)}
                    className="bg-white/70 border-white/80 placeholder:text-gray-500 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 rounded-xl"
                    placeholder="e.g. 2"
                  />
                </div>

                <div className="relative">
                  <Label className="text-gray-700 mb-4 flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-pink-500" />
                    <span>Topics to Focus On</span>
                  </Label>
                  <Input
                    value={topics}
                    required
                    onChange={(e) => setTopics(e.target.value)}
                    className="bg-white/70 border-white/80 placeholder:text-gray-500 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 rounded-xl"
                    placeholder="e.g. React, System Design"
                  />
                </div>

                <div className="relative">
                  <Label className="text-gray-700 mb-4 flex items-center space-x-2">
                    <MessageCircle className="w-4 h-4 text-green-500" />
                    <span>Description</span>
                  </Label>
                  <Textarea
                    rows={3}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="bg-white/70 border-white/80 placeholder:text-gray-500 focus:ring-2 focus:ring-green-400 focus:border-green-400 rounded-xl"
                    placeholder="What are your goals for this session?"
                  />
                </div>

                <Button
                  onClick={createNewSession}
                  disabled={loading}
                  className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:from-indigo-600 hover:to-pink-600 transition-all duration-300 rounded-xl py-3 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  {loading ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    "Launch AI Session"
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {sessions.length === 0 ? (
          <div className="text-center py-20">
            <div className="mb-6">
              <Brain className="w-24 h-24 text-gray-300 mx-auto mb-4" />
              <p className="text-xl text-gray-500 font-medium">
                No sessions found
              </p>
              <p className="text-gray-400 mt-2">
                Create your first AI interview session to get started!
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {sessions.map((session) => (
              <Card
                key={session._id}
                className="group relative overflow-hidden rounded-3xl border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                onMouseEnter={() => setHoveredCard(true)}
                onMouseLeave={() => setHoveredCard(false)}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-indigo-100/60 to-transparent rounded-full transform translate-x-4 -translate-y-4 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-purple-100/60 to-transparent rounded-full transform -translate-x-2 translate-y-2 group-hover:scale-125 transition-transform duration-500"></div>

                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-10" />

                <CardContent className="relative p-8 z-20">
                  {hoveredCard && (
                    <Button
                      onClick={() => handleDeleteSession(session._id)}
                      className="absolute top-2 right-9 p-3 rounded-full bg-red-100/80 text-red-500 hover:bg-red-200/80 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  )}

                  <div className="relative">
                    <div className="absolute top-6 left-[-5px] w-16 h-16 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white font-bold rounded-2xl flex items-center justify-center text-lg shadow-xl border-4 border-white">
                      <img src="/ai-logo.png" alt="" />
                    </div>

                    <div className="pt-6 pl-20">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h3
                            onClick={() =>
                              navigate(`/interview-prep/${session._id}`)
                            }
                            className="text-2xl cursor-pointer font-bold text-gray-900 leading-tight group-hover:text-indigo-700 transition-colors duration-300"
                          >
                            {session.role}
                          </h3>
                          <div className="flex items-center space-x-2 mt-2">
                            <Target className="w-4 h-4 text-gray-400" />
                            <p className="text-base text-gray-600">
                              {session.topicsToFocus}
                            </p>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500 bg-gray-100/80 px-3 py-2 rounded-full backdrop-blur-sm border border-gray-200/50">
                          {new Date(session.updatedAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-3 mb-6">
                        <span className="bg-emerald-100/80 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium border border-emerald-200/50 shadow-sm backdrop-blur-sm flex items-center space-x-2">
                          <Clock className="w-3 h-3" />
                          <span>{session.experience} Years</span>
                        </span>
                        <span className="bg-blue-100/80 text-blue-800 px-4 py-2 rounded-full text-sm font-medium border border-blue-200/50 shadow-sm backdrop-blur-sm flex items-center space-x-2">
                          <MessageCircle className="w-3 h-3" />
                          <span>{session.qnaCount || 3} Q&A</span>
                        </span>
                      </div>

                      <p className="text-base text-gray-700 leading-relaxed">
                        {session.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
