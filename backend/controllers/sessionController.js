import { SessionModel } from "../models/Session.js";
import { QuestionModel } from "../models/Question.js";

export const createSession = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, description, questions } =
      req.body;
    const userId = req.LoggedInUser._id;

    const session = await SessionModel.create({
      user: userId,
      role,
      experience,
      topicsToFocus,
      description,
    });

    const questionIds = [];
    for (const qus of questions) {
      
      const questionDoc = await QuestionModel.create({
        session: session._id,
        question: qus.question,
        answer: qus.answer,
      });
      questionIds.push(questionDoc._id);
    }
   

    session.questions = questionIds;
    await session.save();
    res.status(201).json(session);


  } catch (error) {
    res.status(400);
    console.log("got error", error);
    throw new Error(error.message);
  }
};

export const getSessions = async (req, res) => {
  try {
  } catch (error) {
    res.status(400);
    console.log("got error", error);
    throw new Error(error.message);
  }
};

export const getSessionById = async (req, res) => {
  try {
  } catch (error) {
    res.status(400);
    console.log("got error", error);
    throw new Error(error.message);
  }
};

export const deleteSession = async (req, res) => {
  try {
  } catch (error) {
    res.status(400);
    console.log("got error", error);
    throw new Error(error.message);
  }
};
