import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import dbConnect from './config/db.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import authRoute from './routes/authRoute.js';

dotenv.config({ quiet: true });



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));



//routes
app.use('/api/auth',authRoute)
// app.use('/api/session',sessionRoutes)
// app.use('/api/question',questionRoutes)
// app.use('api/ai/generate-questions',protect,generateInterviewQuestions)
// app.use('/api/ai/generate-explanation',protect,generateInterviewExplanation)










const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    dbConnect();
    console.log(`Server is running on port ${process.env.PORT}`);
});

