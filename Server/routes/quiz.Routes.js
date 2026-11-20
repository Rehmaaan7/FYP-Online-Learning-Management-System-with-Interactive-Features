import express from "express"
import { authenticationMiddleware } from "../middleware/isAuthenticated.js";
import { attempQuiz, createQuiz, deleteQuiz, getQuiz, getQuizzes, getResults } from "../controllers/quiz.Controller.js";

const router = express.Router()

router.route("/quizfor/:courseId").post(authenticationMiddleware,createQuiz)
router.route("/quizzes/:courseId").get(authenticationMiddleware,getQuizzes)
router.route("/quiz/:quizId").get(authenticationMiddleware,getQuiz)
router.route("/delete/:quizId").delete(authenticationMiddleware,deleteQuiz)
router.route("/quiz/:quizId/attempt").post(authenticationMiddleware,attempQuiz)
router.route(`/quizzes/:quizId/results`).get(authenticationMiddleware,getResults)

export default router;