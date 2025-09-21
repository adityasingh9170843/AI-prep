import Webcam from "react-webcam";
import { useState } from "react";
import { WebcamIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
function MockInterview() {
  const [isWebCamOn, setIsWebCamOn] = useState(false);
  return (
    <div>
      {isWebCamOn ?(
        <Webcam
          onUserMedia={() => setIsWebCamOn(true)}
          onUserMediaError={() => setIsWebCamOn(false)}
        />
      ):(
        <WebcamIcon className="h-8 w-8 text-muted-foreground"/>
      )}
      <div onClick={() => setIsWebCamOn(!isWebCamOn)}>
        <Button>{isWebCamOn?"Stop":"Start"}</Button>
      </div>
    </div>
  );
}

export default MockInterview;
