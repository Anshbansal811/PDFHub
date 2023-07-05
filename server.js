import express from "express";
import httpObj from "http";
import dotenv from 'dotenv';
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import { verifyMail } from "./controllers/authController.js";
import fileRoutes from "./routes/fileRoutes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath} from 'url';
//configure env
dotenv.config();

//databse confi
connectDB();

//esmodule fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.__dirname(__filename);

const app=express();
const http=httpObj.createServer(app);

//middelwave
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, `./client/build`)))

//routes
app.use('/api/v1/auth',authRoutes);
app.use("/api/v1/file", fileRoutes);

//rest api
app.use('*',function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'));
});
app.get('/verify', verifyMail );

//Port
const PORT = process.env.PORT || 8000;

//run listen 
app.listen(PORT,()=>{
    console.log(`Server Running on ${PORT}`)
});

