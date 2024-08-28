import express from "express";
import {config} from 'dotenv';
config();
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import errorMiddleware from "./middlewares/error.middleware.js";
import connectToDB from "./db/configs/dbConn.js";
const app = express();
const PORT=5000;
app.use("/files",express.static("files"));




app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(
    cors({
        origin:[process.env.FRONTEND_URL],
        credentials:true
    })
)
import userRoutes from './routes/user.routes.js';
import resumeRoutes from './routes/resume.routes.js';
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/resume",resumeRoutes);
app.use(errorMiddleware);
app.use("/ping",(_req,res)=>{
    res.send("pong");
})

app.listen(PORT,async()=>{
    await connectToDB();
    console.log(`App is running at http://localhost:${PORT}`);
})

export default app;
