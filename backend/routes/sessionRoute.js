import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { createSession, deleteSession, getSessionById, getSessions } from "../controllers/sessionController.js";

const router = express.Router();

router.post('/create',protect,createSession)
router.get('/my-sessions',protect,getSessions)
router.get("/:id",protect,getSessionById)
router.delete("/:id",protect,deleteSession)

export default router