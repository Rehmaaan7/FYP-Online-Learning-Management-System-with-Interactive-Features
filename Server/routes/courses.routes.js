import express from "express"
import { authenticationMiddleware } from "../middleware/isAuthenticated.js"
import { createCourse, createLecture, deleteLecture, getCourse, getCourses, getCreatorCourses, getLectureById, getLectures, getSearchedCourses, toglePublish, updateCourse, updateLecture } from "../controllers/coursesController.js"
import upload from "../utils/multer.js"
const router = express.Router()

router.route("/").post(authenticationMiddleware,createCourse)
router.route("/home").get(getCourses)
router.route("/search").get(authenticationMiddleware,getSearchedCourses)
router.route("/").get(authenticationMiddleware,getCreatorCourses)
router.route("/:courseId").put(authenticationMiddleware,upload.single("thumbnail"),updateCourse)
router.route("/:courseId").get(authenticationMiddleware,getCourse)
router.route("/:courseId/lectures").post(authenticationMiddleware,createLecture)
router.route("/:courseId/lectures").get(authenticationMiddleware, getLectures)
router.route("/:courseId/lectures/:lectureId").post(authenticationMiddleware,updateLecture)
router.route("/lectures/:lectureId").get(authenticationMiddleware,getLectureById)
router.route("/lectures/:lectureId").delete(authenticationMiddleware,deleteLecture)
// router.route("/:courseId").patch(authenticationMiddleware,toglePublish)

export default router;