import React, { use, useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "@/context/userContext";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const userId = user?._id;

  const [sessions, setSessions] = useState([]);
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [targetRole, setTargetRole] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [topics, setTopics] = useState("");
  const [description, setDescription] = useState("");

  const fetchAllSessions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/session/my-sessions",
        { withCredentials: true }
      );
      setSessions(response.data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteSession = async(id) =>{
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/session/${id}`,
        { withCredentials: true }
      );
      console.log(response);
      fetchAllSessions();
    } catch (error) {
      console.error(error);
    }
  }

  const createNewSession = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/session/create",
        {
          targetRole,
          yearsOfExperience,
          topics,
          description,
        },
        { withCredentials: true }
      )
      console.log(response);
      fetchAllSessions();
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };

  useEffect(() => {
    if (userId) fetchAllSessions();
  }, [userId]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Sessions</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add Session</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Session</DialogTitle>
              <DialogDescription>Fill in the details below.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label>Target Role</Label>
                <Input
                value={targetRole}
                onChange ={(e) => setTargetRole(e.target.value)}
                />
              </div>
              <div>
                <Label>Years of Experience</Label>
                <Input type="number" 
                value ={yearsOfExperience}
                onChange={(e) => setYearsOfExperience(e.target.value)}
                />
              </div>
              <div>
                <Label>Topics to Focus On</Label>
                <Input
                value={topics}
                onChange={(e) => setTopics(e.target.value)}
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)} />
              </div>
              <Button onClick={createNewSession}>Create Session</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {sessions.length === 0 ? (
        <p>No sessions found.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {sessions.map((session) => (
            <Card
              key={session._id}
              className="group relative overflow-hidden rounded-2xl border-0 bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-10" />

              <CardContent className="relative p-6 z-20">
                {hover && (
                  <Button
                    onClick={() => handleDeleteSession(session._id)}
                    className="absolute top-0 right-6 p-2 rounded-full bg-red-100 text-red-500 hover:bg-red-200 transition-all duration-200"
                  >
                    <Trash2 className="w-6 h-6" />
                  </Button>
                )}

                <div className="relative">
                  <div className="absolute top-8 w-14 h-14 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white font-bold rounded-xl flex items-center justify-center text-lg shadow-lg border-4 border-white">
                    <img
                      src="https://randomuser.me/api/portraits/men/1.jpg"
                      alt=""
                    />
                  </div>

                  <div className="pt-8 pl-20">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 onClick={() => navigate(`/interview-prep/${session._id}`)} className="text-2xl font-bold text-gray-900 leading-tight group-hover:text-indigo-700 transition-colors duration-300">
                          {session.role}
                        </h3>
                        <p className="text-base text-muted-foreground mt-1">
                          {session.topicsToFocus}
                        </p>
                      </div>
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {new Date(session.updatedAt).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium border border-emerald-200 shadow-sm">
                        {session.experience} Years Exp.
                      </span>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium border border-blue-200 shadow-sm">
                        {session.qnaCount || 3} Q&amp;A
                      </span>
                    </div>

                    <p className="text-base text-gray-700 leading-relaxed">
                      {session.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
