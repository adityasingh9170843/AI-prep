import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import LandingPage from './pages/LandingPage'
import InterviewPrep from './pages/interviewPrep/InterviewPrep'
import {Button} from "./components/ui/button"
import UserProvider from './context/userContext'
function App() {
  

  return (
    <UserProvider>
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/interviewprep/:sId" element={<InterviewPrep />} />
        </Routes>
      </Router>
    </div>
    </UserProvider>
  )
}

export default App
