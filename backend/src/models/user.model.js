import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:[3,"name must be atleast 3 character"],
        maxLength:[15,"must me atmost 15 character"]
    },
    email:{
       type:String,
       required:true,
       unique:true,
       match:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    passwordHash:{
        type:String,
        required:true
    },
    refreshToken:{
        type:String,
    }
})

export const userModel=mongoose.model("users",userSchema)