import { use, useState, useContext } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, BookOpen, Lightbulb, ClipboardCheck, GraduationCap } from "lucide-react" // Importing Lucide icons for the background
import { UserContext } from "../../context/userContext"
function Login() {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();
  const {updateUser} = useContext(UserContext);
  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (!email || !password) {
      setError("Please enter email and password")
      setIsLoading(false)
      return
    }

    try {
     
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password })
      console.log(response.data)
      const {token} = response.data
      if(token){
        localStorage.setItem("token", token)
        updateUser(response.data)
        navigate("#")
      }
      
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 to-teal-50">
     
      <div className="absolute inset-0 z-0 pointer-events-none">
        <BookOpen className="absolute top-1/4 left-1/4 text-blue-200 opacity-30 w-24 h-24 rotate-12" />
        <Lightbulb className="absolute bottom-1/3 right-1/4 text-teal-200 opacity-30 w-20 h-20 -rotate-6" />
        <ClipboardCheck className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-200 opacity-30 w-28 h-28 rotate-45" />
        <GraduationCap className="absolute top-1/4 right-1/3 text-teal-200 opacity-30 w-16 h-16 -rotate-12" />
        <BookOpen className="absolute bottom-1/4 left-1/3 text-blue-200 opacity-20 w-16 h-16 rotate-6" />
        <Lightbulb className="absolute top-1/3 right-1/2 text-teal-200 opacity-20 w-24 h-24 rotate-30" />
      </div>

      <Card className="w-full max-w-md p-6 shadow-xl relative z-10">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Welcome Back</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} required />
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
            <p className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/signup" className="text-primary underline-offset-4 hover:underline">
                Sign up
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login
