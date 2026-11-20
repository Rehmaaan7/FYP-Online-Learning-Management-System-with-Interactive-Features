import express from "express"
import { authenticationMiddleware } from "../middleware/isAuthenticated.js"
import { getCourseProgress, markCompleted, markInCompleted, updateLectureProgress } from "../controllers/progressController.js"
const router = express.Router()

console.log("progress route is loading ... ")
router.get("/:courseId",authenticationMiddleware,getCourseProgress)
console.log("progress route is loaded successfully")
router.post("/:courseId/lecture/:lectureId/view",authenticationMiddleware, updateLectureProgress)
router.post("/:courseId/markcompleted",authenticationMiddleware, markCompleted)
router.post("/:courseId/markincompleted",authenticationMiddleware, markInCompleted)

export default router