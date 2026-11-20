import express from "express"
import { getUserProfile, LogIn, LogOut, SignUp, updateProfile } from "../controllers/userController.js"
import { authenticationMiddleware } from "../middleware/isAuthenticated.js"
import upload from "../utils/multer.js"
const router = express.Router()

router.route("/signup").post(SignUp)
router.route("/login").post(LogIn)
router.route("/logout").post(LogOut)
router.route("/profile").get(authenticationMiddleware, getUserProfile)
router.route("/profile/update").put(authenticationMiddleware, upload.single("profilePhoto"), updateProfile)

export default router;