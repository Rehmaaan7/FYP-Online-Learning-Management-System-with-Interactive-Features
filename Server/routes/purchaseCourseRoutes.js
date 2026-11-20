// import express, { application, json } from "express"
// import {authenticationMiddleware} from "../middleware/isAuthenticated.js"
// import { stripeSession, stripeWebhook } from "../controllers/purchaseCourseController.js"
// const router = express.Router()

// console.log("Purchase routes loaded");

// // router.get("/test", (req, res) => {
// //     res.send("purchase route working");
// // });

// router.route("/checkout/create-checkout-session").post(authenticationMiddleware, stripeSession)
// router.post("/webhook", express.raw({ type: "application/json" }), stripeWebhook);
// // router.post("/webhook", (req, res) => {
// //     console.log("WEBHOOK HIT");
// //     res.sendStatus(200);
// // });

// export default router

import express from "express";
import {
  getPurchaseDetailsWithStatus,
  getUserPurchasedCourses,
  stripeSession,
  stripeWebhook,
} from "../controllers/purchaseCourseController.js";
import { authenticationMiddleware } from "../middleware/isAuthenticated.js";


const router = express.Router();


router.post("/checkout/create-checkout-session",authenticationMiddleware, stripeSession);

router.post("/webhook", express.raw({ type: "application/json" }),stripeWebhook);
router.get("/course/:courseId/detail-with-status", authenticationMiddleware, getPurchaseDetailsWithStatus)
router.get("/", authenticationMiddleware, getUserPurchasedCourses)


export default router;
