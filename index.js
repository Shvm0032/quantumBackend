import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { dbConnect } from './libs/db.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000
// middleware //
app.use(express.json())
app.use(cors(
    {
        origin: "http://localhost:3000" || "https://your-production-domain.com",
        credentials: true,
        optionSuccessStatus: 200,
         methods: ["GET", "POST", "PUT", "DELETE"],
    }
))

// DBCONNECT//
dbConnect();

app.get("/",(req,res)=>{
res.send("Backend is running");
})

app.listen(PORT,()=>{
    console.log(`server is running in ${PORT}`)
})