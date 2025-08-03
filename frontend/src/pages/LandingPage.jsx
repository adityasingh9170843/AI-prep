import { useContext } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APP_FEATURES } from "@/utils/data";
import {
  Sparkles,
  MessageSquare,
  Settings,
  Activity,
  FileText,
  Users,
  Menu,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UserContext } from "@/context/userContext";
import { useNavigate } from "react-router-dom";
const iconMap = {
  Sparkles,
  MessageSquare,
  Settings,
  Activity,
  FileText,
  Users,
};

const LandingPage = () => {
  const { user, loading, logout } = useContext(UserContext);


  

  

  return (
    <div className="min-h-screen bg-slate-900 text-gray-50 font-sans relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-teal-400 rounded-full opacity-60 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          />
        ))}

        {[...Array(15)].map((_, i) => (
          <div
            key={`medium-${i}`}
            className="absolute w-1.5 h-1.5 bg-purple-400 rounded-full opacity-40 animate-float-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${10 + Math.random() * 5}s`,
            }}
          />
        ))}

        {[...Array(8)].map((_, i) => (
          <div
            key={`large-${i}`}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-30 animate-float-reverse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${12 + Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-15px);
          }
          75% {
            transform: translateY(-30px) translateX(5px);
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-15px) translateX(20px) rotate(120deg);
          }
          66% {
            transform: translateY(-25px) translateX(-10px) rotate(240deg);
          }
        }

        @keyframes float-reverse {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) scale(1);
          }
          25% {
            transform: translateY(15px) translateX(-20px) scale(1.1);
          }
          50% {
            transform: translateY(25px) translateX(15px) scale(0.9);
          }
          75% {
            transform: translateY(10px) translateX(-5px) scale(1.05);
          }
        }

        .animate-float {
          animation: float infinite ease-in-out;
        }

        .animate-float-slow {
          animation: float-slow infinite ease-in-out;
        }

        .animate-float-reverse {
          animation: float-reverse infinite ease-in-out;
        }
      `}</style>

      <header className="container mx-auto px-6 py-6 flex justify-between items-center relative z-10">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-teal-400 to-purple-500 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">Ai-Prep</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          {user ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {user.profileImageUrl ? (
                  <img
                    className="w-8 h-8 rounded-full ring-2 ring-teal-400"
                    src={user.profileImageUrl || "/placeholder.svg"}
                    alt={user.name}
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-teal-500 flex items-center justify-center">
                    <span className="text-white font-semibold text-xs">
                      {user.name?.charAt(0)?.toUpperCase()}
                    </span>
                  </div>
                )}
                <span className="text-sm text-gray-300">{user.name}</span>
              </div>
              <Link to="/dashboard">
                <Button
                  size="sm"
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                >
                  Dashboard
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-white"
                onClick={logout}
                disabled={loading}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-300 hover:text-black"
                >
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  size="sm"
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-slate-800 border-slate-700"
            >
              <SheetHeader>
                <SheetTitle className="text-white">Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {user ? (
                  <>
                    <Link to="/dashboard">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-white"
                      >
                        Dashboard
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-white"
                      onClick={logout}
                      disabled={loading}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-white"
                      >
                        Login
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button className="w-full bg-teal-600 hover:bg-teal-700">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Split Screen Hero Section */}
      <section className="relative z-10 min-h-[80vh] flex items-center">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="text-white">AI Will Master</span>
                  <br />
                  <span className="text-white">Your</span>
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-400">
                    Interview Skills
                  </span>
                </h1>

                <div className="space-y-4">
                  <p className="text-xl text-gray-300 leading-relaxed">
                    Master the art of interview preparation. Practice, analyze,
                    and perfect your responses to land your dream job.
                  </p>
                  <p className="text-teal-400 font-semibold">
                    Join thousands who've already succeeded.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {user ? (
                  <Link to="/dashboard">
                    <Button
                      size="lg"
                      className="bg-teal-600 hover:bg-teal-700 text-white"
                    >
                      Continue to Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Link to="/login">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Start Practicing
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/ai.png"
                  alt="AI Interview Preparation"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
              </div>

              <div className="absolute -top-4 -right-4 w-8 h-8 bg-teal-400 rounded-full opacity-60 animate-pulse" />
              <div
                className="absolute -bottom-6 -left-6 w-6 h-6 bg-purple-400 rounded-full opacity-50 animate-pulse"
                style={{ animationDelay: "1s" }}
              />
              <div
                className="absolute top-1/2 -right-8 w-4 h-4 bg-blue-400 rounded-full opacity-40 animate-pulse"
                style={{ animationDelay: "2s" }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20 bg-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {APP_FEATURES.slice(0, 4).map((feature, index) => {
              const Icon = iconMap[feature.icon];
              const colors = [
                "from-teal-500 to-cyan-500",
                "from-blue-500 to-indigo-500",
                "from-purple-500 to-pink-500",
                "from-yellow-500 to-orange-500",
              ];

              return (
                <Card
                  key={index}
                  className="bg-slate-800/80 backdrop-blur-sm border-slate-700 hover:border-teal-400/50 transition-all duration-300 group"
                >
                  <CardHeader className="text-center pb-4">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${colors[index]} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      {Icon && <Icon className="w-8 h-8 text-white" />}
                    </div>
                    <CardTitle className="text-white text-lg font-semibold group-hover:text-teal-400 transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-gray-400 text-center text-sm leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="relative z-10 bg-slate-900 border-t border-slate-800 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Ai-Prep by Aditya Singh. All
            rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
