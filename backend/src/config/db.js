import mongoose, { connect } from "mongoose";
import { config } from "./config.js";

export const connectToDb=async()=>{
    try {
        await mongoose.connect(config.MONGODB_URI)
        console.log("connected to db")
    } catch (error) {
        console.log("error in connecting database",error)
    }
}