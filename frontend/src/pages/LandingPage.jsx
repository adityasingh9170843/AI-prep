import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UserContext } from "@/context/userContext";

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

  if (loading) return <div>Loading...</div>;
  return (
    <div className="min-h-screen bg-gray-950 text-gray-50 font-sans relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 opacity-90" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen blur-3xl opacity-20" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600 rounded-full mix-blend-screen blur-3xl opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-500 rounded-full mix-blend-screen blur-3xl opacity-15" />
      </div>

      <header className="container mx-auto px-4 py-6 flex justify-between items-center relative z-10">
        <div className="text-3xl font-extrabold text-white tracking-tight">
          Ai-Prep
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          {user ? (
            <>
              <div className="flex items-center space-x-2 mr-4">
                {user.profileImageUrl ? (
                  <img
                    className="w-12 h-12 mr-3 rounded-full ring-2 ring-white shadow-md transition-transform duration-300 hover:scale-105"
                    src={user.profileImageUrl}
                    alt={user.name}
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full border border-white/30 bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                    <span className="text-white font-semibold text-xs">
                      {user.name?.charAt(0)?.toUpperCase()}
                    </span>
                  </div>
                )}
                <span className="text-white text-sm font-medium hidden md:inline">
                  Welcome {user.name}
                </span>
              </div>

              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className="text-white">
                  Dashboard
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="sm"
                className="text-white "
                disabled={loading}
                onClick={logout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10"
                >
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10"
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </nav>
        <Button variant="ghost" size="icon" className="md:hidden text-white">
          <Sheet>
            <SheetTrigger>
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent
              side="left"
              className="bg-gray-900 text-white border-l border-gray-700 shadow-lg"
            >
              <SheetHeader>
                <SheetTitle className="text-white">
                  {user ? `Welcome, ${user.name}` : "Welcome"}
                </SheetTitle>
                <SheetDescription className="text-gray-400">
                  <div className="mt-4 space-y-2">
                    {user ? (
                      <>
                        <Link to="/dashboard">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-white"
                          >
                            Dashboard
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-white"
                          disabled={loading}
                          onClick={logout}
                        >
                          Logout
                        </Button>
                      </>
                    ) : (
                      <>
                        <Link to="/login">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-white"
                          >
                            Login
                          </Button>
                        </Link>
                        <Link to="/register">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-white"
                          >
                            Register
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </Button>
      </header>

      {/* Hero */}
      <section className="py-20 md:py-28 text-center relative z-10">
        <div className="container mx-auto px-4">
          <Badge className="mb-4 px-4 py-1.5 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full shadow-md">
            🚀 Elevate Your Interview Game
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              Intelligent
            </span>{" "}
            Interview Preparation
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Unlock your full potential with AI-driven mock interviews,
            personalized feedback, and strategic insights to conquer any job
            interview.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-900 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Ai-Prep is Your{" "}
            <span className="text-purple-400">Ultimate Advantage</span>
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {APP_FEATURES.map((feature, index) => {
              const Icon = iconMap[feature.icon];
              return (
                <Card
                  key={index}
                  className="bg-gray-800 border border-gray-700 shadow-md hover:shadow-lg transition-shadow"
                >
                  <CardHeader className="flex flex-col items-center">
                    {Icon && (
                      <div className="p-3 mb-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-md">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                    )}
                    <CardTitle className="text-lg font-semibold text-white text-center">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-gray-400">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="bg-gray-950 text-gray-500 py-8 text-center relative z-10">
        <div className="container mx-auto px-4">
          <p>
            &copy; {new Date().getFullYear()} Ai-Prep. by Aditya Singh All
            rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
