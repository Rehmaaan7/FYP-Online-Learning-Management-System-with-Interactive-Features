import express from "express"
import { authenticationMiddleware } from "../middleware/isAuthenticated.js"
import { createForum, createPost, deletePostFromForum, getForumPosts, getForumByCourseId } from "../controllers/forumController.js"
const router = express.Router()

router.route("/forum/:courseId").post(authenticationMiddleware,createForum)
router.route("/forum/:courseId").get(authenticationMiddleware,getForumByCourseId)
router.route("/posts/:forumId").post(authenticationMiddleware,createPost)
router.route("/posts/:forumId").get(authenticationMiddleware,getForumPosts)
router.route("/posts/:forumId/:postId").delete(authenticationMiddleware, deletePostFromForum)

export default router