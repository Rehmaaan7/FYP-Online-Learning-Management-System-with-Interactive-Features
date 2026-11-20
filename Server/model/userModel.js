import mongoose, { model } from "mongoose";

const projectSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    password:{
        type:String,
        required:true

    },
    role:{
        type:String,
        enum:["admin","instructor", "student"],
        default:"student"
    },
    enrolledcourses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'course'
        }
    ],
    photoUrl:{
        type:String,
        default:""
    }

},{timestamps:true})

export const User = mongoose.model("User",projectSchema) 
// "User" = collection name, const User = model name

