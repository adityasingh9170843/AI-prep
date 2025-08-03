import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import { UserContext } from "@/context/userContext";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Loader2, BookOpen, Lightbulb, ClipboardCheck, GraduationCap,
  PencilRuler, MessageSquare, Laptop, UserCheck, Sparkles
} from "lucide-react";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate(); 

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !name) {
      setError("Please enter email, password and name");
      return;
    }

    try {
      setError("");
      setLoading(true);

      let imageUrl = null;

      if (selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile);

        const imgUpload = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/upload-image`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );

        imageUrl = imgUpload.data.imageUrl;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          email,
          password,
          name,
          profileImageUrl: imageUrl, 
        },
        {
          withCredentials: true,
        }
      );

      console.log(response.data);
      updateUser(response.data);
      navigate("/"); 
    } catch (err) {
      console.log(err);
      setError(err?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    const timer = setTimeout(()=>{
      setInitialLoading(false);
    },2000)

    return () => clearTimeout(timer);
  },[])

  
   if (initialLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
          <Sparkles className="w-10 h-10 animate-spin text-purple-500 mr-2" />
          <p className="text-lg font-semibold text-gray-700">
            First Step towards Success...
          </p>
        </div>
      );
    }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <BookOpen className="absolute top-1/4 left-[10%] text-blue-300 opacity-20 w-28 h-28 rotate-12" />
        <Lightbulb className="absolute bottom-1/3 right-[15%] text-purple-300 opacity-25 w-24 h-24 -rotate-6" />
        <ClipboardCheck className="absolute top-[20%] right-[5%] text-pink-300 opacity-20 w-20 h-20 rotate-45" />
        <GraduationCap className="absolute bottom-[10%] left-[5%] text-blue-300 opacity-25 w-32 h-32 -rotate-12" />
        <PencilRuler className="absolute top-[50%] left-[5%] text-purple-300 opacity-20 w-24 h-24 rotate-6" />
        <MessageSquare className="absolute bottom-[20%] right-[5%] text-pink-300 opacity-25 w-28 h-28 rotate-30" />
        <Laptop className="absolute top-[5%] left-[40%] text-blue-300 opacity-20 w-20 h-20 -rotate-3" />
        <UserCheck className="absolute bottom-[5%] left-[45%] text-purple-300 opacity-20 w-24 h-24 rotate-15" />
        <BookOpen className="absolute top-[70%] right-[30%] text-pink-300 opacity-20 w-20 h-20 -rotate-20" />
        <Lightbulb className="absolute top-[10%] right-[25%] text-blue-300 opacity-25 w-28 h-28 rotate-40" />
      </div>

      <Card className="w-full max-w-md p-6 shadow-2xl relative z-10 bg-white/30 backdrop-blur-lg border border-white/40 rounded-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-gray-800">Create an Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm">
                {error}
              </div>
            )}

            <Input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-white/60 border-white/80 placeholder:text-gray-600 focus:ring-blue-400 focus:border-blue-400"
              disabled={loading}
            />

            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white/60 border-white/80 placeholder:text-gray-600 focus:ring-blue-400 focus:border-blue-400"
              disabled={loading}
            />
            <div>
              <label className="text-sm ml-2 text-gray-700">Upload Profile Image</label>
            </div>
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              placeholder="Profile Image"
              className="bg-white/60 border-white/80 placeholder:text-gray-600 focus:ring-blue-400 focus:border-blue-400"
              disabled={loading}
            />

            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-white/60 border-white/80 placeholder:text-gray-600 focus:ring-blue-400 focus:border-blue-400"
              disabled={loading}
            />

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing Up...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>

            <p className="text-center text-sm text-gray-700">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 underline-offset-4 hover:underline">
                Login
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignUp;
