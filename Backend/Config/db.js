import mongoose from "mongoose";
import dotenv from 'dotenv/config'

const dbConnection = async ()=>{
    try {
        
     await mongoose.connect(process.env.URI)
     console.log("Data Base  Connected")

    } catch (error) {
        console.log("Db connection error",error)
    }

}

dbConnection()
