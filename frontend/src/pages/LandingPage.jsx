import React from 'react'
import { APP_FEATURES } from '@/utils/data'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
function LandingPage() {
  const navigate = useNavigate()

  const [openAuthModal, setOpenAuthModal] = useState(false)
  const [currentPage, setCurrentPage] = useState("login")

  const handleCTA = () =>{

  }


  return (
    <div className=''>
      {/* header */}
      <header>
        <div>
          Ai-Prep
        </div>
        <button className='' onClick={()=>setOpenAuthModal(true)}>
          Login/SignUp
        </button>
      </header>

      {/* Hero */}
      <div>
        <div>
          <div>
            AI Powered
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage