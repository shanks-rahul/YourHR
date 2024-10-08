import express from "express";
import {config} from 'dotenv';
config();
import cors from 'cors';
import path from "path";
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import errorMiddleware from "./middlewares/error.middleware.js";
import connectToDB from "./db/configs/dbConn.js";
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT=5000;
app.use("/files",express.static("files"));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

app.use(cors());

import userRoutes from './routes/user.routes.js';
import resumeRoutes from './routes/resume.routes.js';
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use("/user",userRoutes);
app.use("/resume",resumeRoutes);
app.use(errorMiddleware);
app.use("/ping",(_req,res)=>{
    res.send("pong");
})

app.listen(PORT,async()=>{
    await connectToDB();
    console.log(`App is running at http://localhost:${PORT}`);
})

export default app;
