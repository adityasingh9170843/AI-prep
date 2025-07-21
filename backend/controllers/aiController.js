import { GoogleGenAI } from "@google/genai";
import { questionAnswerPrompt } from "../utils/prompts.js";

const ai = new GoogleGenAI({
  apiKey: "",
});

export const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;
    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      res.status(400);
      throw new Error("All fields are required");
    }
    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicsToFocus,
      numberOfQuestions
    );
    const response = await ai.models.generateContent({
      contents: prompt,
      model: "gemini-2.0-flash",
      temperature: 0.7,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400);
    console.log("got error", error);
    throw new Error(error.message);
  }
};

export const generateInterviewExplanation = async (req, res) => {
  try {
  } catch (error) {
    res.status(400);
    console.log("got error", error);
    throw new Error(error.message);
  }
};
