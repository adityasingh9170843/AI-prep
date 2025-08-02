import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
function StartAQuiz() {
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState(null);
  const [role, setRole] = useState(null);

  const { sId } = useParams();
  console.log(sId);

  const getSessionById = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/session/${sId}`, {
        withCredentials: true,
      });
      setSessionData(res.data);
      console.log(res.data);
      setRole(res.data.role);
      console.log(res.data.role);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  const generateQuiz = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:5000/api/ai/generate-quiz`,
        { role },
        { withCredentials: true }
      );
      console.log(response.data);
      setQuestion(response.data);
      
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSessionById();
  }, []);

  useEffect(() => {
    if (role) {
      generateQuiz();
    }
  }, [role]);
  if (loading) {
    return <div>Loading...</div>;
  }
  console.log("qqq",question);

  return <div>StartAQuiz</div>;
}

export default StartAQuiz;
