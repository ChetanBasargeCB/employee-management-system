import express from "express";
import cors from 'cors'
import dotenv from 'dotenv/config'
import './Config/db.js'
import AdminRouter from "./Routes/adminRoutes.js";
import cookieParser from "cookie-parser";
import EmployeRouter from "./Routes/employeRoutes.js";

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(cookieParser())

app.use("/admin",AdminRouter) 
app.use("/employes",EmployeRouter)

app.get("/",(req,res)=>{
    res.send("Welcome")
})

app.listen(port,()=>{
    console.log("Server Running")
})  