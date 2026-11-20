import express from "express"
import { authenticationMiddleware } from "../middleware/isAuthenticated.js"
import { CourseStatusControllByAdmin, createSystemAnnouncementByAdmin, deleteAnnouncementByAdmin, deleteCourseByAdmin, deleteUser, getSystemAnnouncements, getUsersForAdmin, showAllCoursesToAdmin, updateUserRole } from "../controllers/Admin.Controller.js"
const router = express.Router()

router.route("/admin/users").get(authenticationMiddleware,getUsersForAdmin)
router.route("/admin/users/:userId/role").put(authenticationMiddleware, updateUserRole)
router.route("/admin/users/:userId/delete").delete(authenticationMiddleware, deleteUser)
router.route("/admin/courses").get(authenticationMiddleware, showAllCoursesToAdmin)
router.route("/admin/courses/:courseId/status").put(authenticationMiddleware, CourseStatusControllByAdmin)
router.route("/admin/courses/:courseId").delete(authenticationMiddleware, deleteCourseByAdmin)
router.route("/admin/system-announcements").get(authenticationMiddleware,getSystemAnnouncements)
router.route("/admin/system-announcements").post(authenticationMiddleware,createSystemAnnouncementByAdmin)
router.route("/admin/system-announcements/:announcementId").delete(authenticationMiddleware,deleteAnnouncementByAdmin)
export default router;