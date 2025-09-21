import Webcam from "react-webcam"
import { useState } from "react"
function MockInterview() {
    const [isWebCamOn, setIsWebCamOn] = useState(false)
  return (
    <div>
      <Webcam
      onUserMedia={()=>setIsWebCamOn(true)}
      onUserMediaError={()=>setIsWebCamOn(false)}
      
      />
    </div>
  )
}

export default MockInterview