import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
    forumId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Forum",
        required:true
    },
    autherId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    message:{
        type:String,
        required:true,
        trim:true
    }
},{timestamps:true})

export const Post = mongoose.model("Post",postSchema)