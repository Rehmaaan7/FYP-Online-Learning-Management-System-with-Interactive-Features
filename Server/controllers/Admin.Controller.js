import express from "express"
import { User } from "../model/userModel.js"
import {Course} from "../model/coursesModel.js"
import {Announcement} from "../model/systemAnnouncement.model.js"


export const getUsersForAdmin = async (req, res) => {
    try {
        const users = await User.find().select("-password").sort({createdAt:-1})

        if (!users) {
            return res.status(404).json({
                message:"no accounts yet"
            })
        }
        return res.status(200).json({
            success:true,
            users}
        )
    } 
    
    
    catch (error) {
        console.log(error)
    }
    
}

export const updateUserRole = async (req, res) => {
    try {
        const {userId} = req.params
        const {role} = req.body

        if (!["admin","instructor","student"].includes(role)) {
            return res.status(400).json({
                message:"invalid role"
            })
        }

        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({
                message:"user not found"
            })
        }
        user.role = role
        await user.save()
        return res.status(200).json({
            success:true,
            message:"user role updated successfully",
            user
        })
        
    } catch (error) {
        console.log(error)
    }
}

export const deleteUser = async (req, res) => {
    try {
        const {userId} = req.params

        const deleteUser = await User.findByIdAndDelete(userId)

        if (!deleteUser) {
            return res.status(404).json({
                Message:"user not found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"user deleted successfully"
        })
    } catch (error) {
        console.log(error)
    }
    
}

export const showAllCoursesToAdmin = async (req, res) => {
    try {
        const courses = await Course.find().populate({path:"creator", select:"name email"}).sort({createdAt:-1})

        if (!courses) {
            return res.status(404).json({
                message:"no course found"
            })
        }

        return res.status(200).json({
            success:true,
            courses
        })
    } catch (error) {
        console.log(error)
    }
    
}

export const CourseStatusControllByAdmin = async (req, res) => {
    try {
        const {courseId} = req.params
        const {status} = req.body

        const course = await Course.findById(courseId)

        if (!course) {
            return res.status(404).json({
                message:"course not found"
            })
        }
        course.isPublished = status

        await course.save()

        return res.status(200).json({
            message:"status updated successfully",
            course

        })

    } catch (error) {
        console.log(error)
    }
    
}

export const deleteCourseByAdmin = async (req, res) => {
    try {
        const {courseId} = req.params

        const deleteCourse = await Course.findByIdAndDelete(courseId)
        if (!deleteCourse) {
            return res.status(404).json({
                message:"no course found to delete"
            })
        }
        return res.status(200).json({
            success:true,
            message:"course deleted successfully"
        })
    } catch (error) {
        console.log(error)
    }
    
}

export const getSystemAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.find().populate({path:"createdBy", select:"name role"})

        if (!announcements) {
            return res.status(404).json({
                success:false,
                message:"no announcement found"
            })
        }
        return res.status(200).json({
            success:true,
            announcements
        })
        
    } catch (error) {
        console.log(error)
    }
}

export const createSystemAnnouncementByAdmin = async (req, res) => {
    try {
        const userId = req.id
        const {message} = req.body

        if (!message) {
            return res.status(400).json({
                message:"announcement message is required"
            })
        }

        const newAnnouncement = new Announcement({
            createdBy:userId,
            message
        })
        await newAnnouncement.save()
        return res.status(200).json({
            success:true,
            newAnnouncement,
            message:"announcement created successfully"
        })
    } catch (error) {
        console.log(error)
    }
}

export const deleteAnnouncementByAdmin = async (req, res) => {
    try {
        const {announcementId} = req.params

        const announcement = await Announcement.findByIdAndDelete(announcementId)

        if (!announcement) {
            return res.status(404).json({
                message:"no announcement was found to delete"
            })
        }
        return res.status(200).json({
            success:true,
            message:"announcement was deleted successfully"
        })
    } catch (error) {
        console.log(error)
    }
}
