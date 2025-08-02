import { GoogleGenAI } from "@google/genai";
import {
  questionAnswerPrompt,
  conceptExplainPrompt,
  generateQuizPrompt,
} from "../utils/prompts.js";
import dotenv from "dotenv";
dotenv.config();
const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
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

    let rawText = response.text;
    const cleanedText = rawText
      .replace(/^\s*```json\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const parsed = JSON.parse(cleanedText);
    res.status(200).json(parsed);
  } catch (error) {
    res.status(400);
    console.log("got error", error);
    throw new Error(error.message);
  }
};

export const generateInterviewExplanation = async (req, res) => {
  try {
    const { question } = req.body;
    console.log("hit");
    if (!question) {
      res.status(400);
      throw new Error("All fields are required");
    }

    const prompt = conceptExplainPrompt(question);

    const response = await ai.models.generateContent({
      contents: prompt,
      model: "gemini-2.0-flash",
      temperature: 0.7,
    });

    let rawText = response.text;
    const cleanedText = rawText
      .replace(/^\s*```json\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const parsed = JSON.parse(cleanedText);
    res.status(200).json({
      parsed,
    });
  } catch (error) {
    res.status(400);
    console.log("got error", error);
    throw new Error(error.message);
  }
};


export const generateInterviewQuiz = async (req, res) => {
  try {
    const { role } = req.body;

    if (!role) {
      res.status(400);
      throw new Error("Topic is required");
    }

    const prompt = generateQuizPrompt(role);
    const response = await ai.models.generateContent({
      contents: prompt,
      model: "gemini-2.0-flash",
      temperature: 0.7,
    });

    let rawText = response.text;

    const cleanedText = rawText
      .replace(/^\s*```(json)?\s*/i, "")
      .replace(/\s*```$/, "")
      .trim();

    const parsed = JSON.parse(cleanedText);

    
    if (!Array.isArray(parsed) || parsed.length === 0) {
      throw new Error("Invalid quiz format returned by AI.");
    }

    res.status(200).json(parsed);
  } catch (error) {
    console.error("Quiz generation failed:", error.message);
    res.status(500).json({ message: error.message || "Server Error" });
  }
};

