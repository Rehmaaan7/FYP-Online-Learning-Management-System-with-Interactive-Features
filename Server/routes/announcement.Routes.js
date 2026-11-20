import express from "express"
import { authenticationMiddleware } from "../middleware/isAuthenticated.js"
import { createAnnouncement, deleteAnnouncement, showAnnouncements } from "../controllers/annuncements.Controller.js";

const router = express.Router()

 router.route("/instructor/:courseId/announcement").post(authenticationMiddleware,createAnnouncement)
 router.route("/instructor/:courseId/announcement").get(authenticationMiddleware,showAnnouncements)
 router.route("/system/announcement").get(authenticationMiddleware,showAnnouncements)
 router.route("/instructor/course/:announcementId").delete(authenticationMiddleware,deleteAnnouncement)

 export default router;