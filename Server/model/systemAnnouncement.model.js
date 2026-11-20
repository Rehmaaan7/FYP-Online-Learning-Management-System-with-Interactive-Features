import mongoose, { Schema } from "mongoose"

const systemAnnouncementSchema = new Schema({
    
    message:{
        type:String,
        required:true,
        trim:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
        
    },
    isGlobal:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

export const Announcement = mongoose.model("Announcment",systemAnnouncementSchema)