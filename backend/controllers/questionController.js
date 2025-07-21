import {QuestionModel} from "../models/Question.js";
import { SessionModel } from "../models/Session.js";


export const addQuestion = async(req,res)=>{
    try{
        const {sessionId,questions} = req.body;

        if(!sessionId || !questions || questions.length === 0){
            res.status(400);
            throw new Error("Invalid request");
        }
        const session = await SessionModel.findById(sessionId);
        if(!session){
            res.status(400);
            throw new Error("Session does not exist");
        }

        const questionDocs = [];
        for(const question of questions){
            const questionDoc = await QuestionModel.create({
                session: sessionId,
                question: question.question,
                answer: question.answer,
            });
            questionDocs.push(questionDoc);
        }
        session.questions.push(...questionDocs.map(q=>q._id));
        await session.save();
        res.status(201).json(questionDocs);
    }
    catch(error){
        res.status(400);
        console.log("got error", error);
        throw new Error(error.message);
    }
}

export const togglePinQuestion = async(req,res)=>{
    try{
        const id = req.params.id;
        const question = await QuestionModel.findById(id);
        if(!question){
            res.status(400);
            throw new Error("Question does not exist");
        }
        question.isPinned = !question.isPinned;
        await question.save();
        res.status(200).json(question);
    }
    catch(error){
        res.status(400);
        console.log("got error", error);
        throw new Error(error.message);
    }
}

export const updateQuestionNote = async(req,res)=>{
    try{
        const {note} = req.body;
        const id = req.params.id;
        const question = await QuestionModel.findById(id);
        if(!question){
            res.status(400);
            throw new Error("Question does not exist");
        }
        question.note = note || "";
        await question.save();
        res.status(200).json(question);
    }
    catch(error){
        res.status(400);
        console.log("got error", error);
        throw new Error(error.message);
    }
}