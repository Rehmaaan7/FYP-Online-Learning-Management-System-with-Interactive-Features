import express from "express"
import { Assignment, AssignmentSubmission } from "../model/assignment.Model.js"
import { uploadDocument } from "../utils/cloudinary.js"

export const createAssignment = async (req, res) => {
    try {
        const {courseId} = req.params 
        const {title, instructions, deadline } = req.body 
        const createdBy = req.id 

        if (!title) {
            return res.status(400).json({
                message:"title is required"
            })
        }
        if (!deadline) {
            return res.status(400).json({
                message:"deadline is required"
            })
        }


        const assignment = new Assignment({
            courseId,
            createdBy,
            title,
            instructions,
            deadline
        })
        await assignment.save()
        return res.status(201).json({
            success:true,
            assignment
        })
    } catch (error) {
        console.log(error)
    }
}

export const getAssignments = async (req, res) => {
    try {
        const {courseId} = req.params
        const assignments = await Assignment.find({courseId}).sort({createdAt:-1})
        if (!assignments) {
            return res.status(400).json({
                message:"no assignments found"
            })
        }
        return res.status(200).json({
            success:true,
            assignments
        })

    } catch (error) {
        console.log(error)
    }
}

export const deleteAssignment = async (req, res) => {

    try {
        
        const {assignmentId} = req.params

        const deletingAssignment = await Assignment.findById(assignmentId)

        if (!deletingAssignment) {
            return res.status(404).json({
                message:"no assignment found to delete"
            })
        }
        await Assignment.findByIdAndDelete(assignmentId)
        return res.status(200).json({
            success:true,
            message:"assignment deleted successfully"
        })
    } catch (error) {
        console.log(error)
        
    }
    
}

export const submitAssignment = async (req, res) => {
    try {
        const {assignmentId} = req.params
       
        const file = req.file
        
        const studentId = req.id

        if (!file) {
            return res.status(400).json({
                message:"please upload a file"
            })
        }

        const assignment = await Assignment.findById(assignmentId)
        if (!assignment) {
            return res.status(404).json({
                message:"assignment not found"
            })
        }

        const alreadySubmitted = await AssignmentSubmission.findOne({assignmentId,studentId})
        if (alreadySubmitted) {
            return res.status(400).json({
                message:"assignment already submitted"
            })
        }

        if (new Date() > new Date(assignment.deadline)) {
            return res.status(400).json({
                message:"date is over now"
            })
        }

        const uploadFile = await uploadDocument(file.path)

        const newAssignment = new AssignmentSubmission({
            assignmentId,
            studentId,
            fileUrl:uploadFile.secure_url,
            filePublicId:uploadFile.public_id
        })

        await newAssignment.save()
        return res.status(201).json({
            success:true,
            newAssignment,
            message:"assignment submitted successfully"
        })

    } catch (error) {
        console.log(error)
    }
    
}

export const getAssignmentSubmissions = async (req, res) => {
    try {
        const {assignmentId} = req.params
        const submittedAssignments = await AssignmentSubmission.find({assignmentId}).populate({path:"studentId", select:"name email"})

        if (!submittedAssignments) {
            return res.status(404).json({
                message:"no assignments found"
            })
        }

       

        return res.status(201).json({
            success:true,
            submittedAssignments
        })
    } catch (error) {
        console.log(error)
    }
}

export const gradeSubmissions = async (req,res) => {
    try {
        const {submissionId} = req.params
        const {grade, feedback} = req.body

        const submission = await AssignmentSubmission.findById(submissionId)

        if (!submission) {
            return res.status(404).json({
                message:"no submissions found"
            })
        }
        submission.grade = grade
        submission.feedback = feedback

        await submission.save()

        return res.status(200).json({
            success:true,
            submission
        })

    } catch (error) {
        console.log(error)
    }
    
}