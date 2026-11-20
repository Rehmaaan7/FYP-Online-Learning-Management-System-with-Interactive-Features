import express from "express"
import dotenv from "dotenv"
import connectDb from "./database/dbConnect.js"
import userRoutes from "./routes/userRoute.js"
import cookieParser from "cookie-parser"
import cors from 'cors'
import coursesRouter from "./routes/courses.routes.js"
import mediaRoute from "./routes/mediaRoutes.js"
import purchaseCourseRoute  from "./routes/purchaseCourseRoutes.js";
import progressRoutes from "./routes/CourseProgress.routes.js"
import forumRoutes from "./routes/forum.routes.js"
import adminRoutes from "./routes/adminRoutes.js"
import announcementRoutes from "./routes/announcement.Routes.js"
import quizRoutes from "./routes/quiz.Routes.js"
import assignmentRoutes from "./routes/assignments.Routes.js"

const app = express()
app.use("/uploads", express.static("uploads"));


dotenv.config();

app.use(cookieParser());
app.use(cors({
  origin: [
    process.env.FRONT_END_URL,
    "http://localhost:5173"
  ].filter(Boolean),
  credentials: true
}));



const PORT = process.env.PORT || 5001

connectDb()

app.use(express.json());



app.use("/api/something/media",mediaRoute)
app.use("/api/something/user",userRoutes)
app.use("/api/something/course",coursesRouter)
app.use("/api/something/purchase", purchaseCourseRoute)
app.use("/api/something/progress",progressRoutes)
app.use("/api/something/forum",forumRoutes)
app.use("/api/something/admin-panel",adminRoutes)
app.use("/api/something/announcement",announcementRoutes)
app.use("/api/something/quiz",quizRoutes)
app.use("/api/something/assignment",assignmentRoutes)


// app.use(
//   "/api/something/purchase/webhook",
//   express.raw({ type: "application/json" })
// );




app.listen(PORT, ()=>{
    console.log("app is listening at port : ",PORT)
})