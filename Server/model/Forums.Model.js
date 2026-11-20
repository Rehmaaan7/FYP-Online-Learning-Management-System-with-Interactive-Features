import mongoose, { mongo } from "mongoose"

const forumSchema = new mongoose.Schema({
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        required:true
    },
     createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title:{
        type:String,
        required:true,
        trim:true
    }
   

},{timeStamps:true})
export const Forum = mongoose.model("Forum", forumSchema)