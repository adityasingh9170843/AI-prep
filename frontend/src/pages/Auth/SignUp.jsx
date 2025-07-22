import React from 'react'
import { useState } from 'react'
function SignUp() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!email || !password || !name) {
      setError("Please enter email, password and name")
      return
    }

    try{
      const response = await axios.post("http://localhost:5000/api/auth/register", { email, password, name, profileImageUrl })
      if(response.status === 201) {
        localStorage.setItem("token", response.data.token)
        navigate("/")
      }
      
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong")
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder='name' onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder='email' onChange={(e) => setEmail(e.target.value)} />
      <input type="file" placeholder='Upload image' />
      <input type="password" placeholder='password' onChange={(e) => setPassword(e.target.value)} />

    </form>
  )
}

export default SignUp