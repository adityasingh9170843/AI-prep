import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routes/routes.js';
import cookieParser from 'cookie-parser';



dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(Path.join(__dirname, "uploads"),{}));

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}))


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});