import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import LandingPage from './pages/LandingPage'
import InterviewPrep from './pages/interviewPrep/InterviewPrep'
import {Button} from "./components/ui/button"
import UserProvider from './context/userContext'
import Dashboard from './pages/Home/Dashboard'
function App() {
  

  return (
    <UserProvider>
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path="/register" element={<SignUp />} />
          <Route path="/interview-prep/:sId" element={<InterviewPrep />} />
        </Routes>
      </Router>
    </div>
    </UserProvider>
  )
}

export default App
