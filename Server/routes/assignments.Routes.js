import express, { Router } from "express"
import {authenticationMiddleware} from "../middleware/isAuthenticated.js"
import { createAssignment, deleteAssignment, getAssignments, getAssignmentSubmissions, gradeSubmissions, submitAssignment } from "../controllers/assignment.controller.js";
import upload from "../utils/multer.js";

const router = express.Router()


router.route("/instructor/assignment/:courseId").post(authenticationMiddleware,createAssignment)
router.route("/instructor/assignment/:courseId").get(authenticationMiddleware,getAssignments)
router.route("/instructor/assignment/:assignmentId").delete(authenticationMiddleware,deleteAssignment)
router.route("/student/:assignmentId/submit").post(authenticationMiddleware, upload.single("file"),submitAssignment)
router.route("/instructor/:assignmentId/submissions").get(authenticationMiddleware,getAssignmentSubmissions)
router.route("/instructor/submissions/:submissionId/grade").put(authenticationMiddleware,gradeSubmissions)


export default router;