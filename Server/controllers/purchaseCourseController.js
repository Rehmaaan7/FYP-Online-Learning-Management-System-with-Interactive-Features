import Stripe from "stripe";
import { Course } from "../model/coursesModel.js";
import { purchaseCourse } from "../model/purchaseModel.js";
import { Lecture } from "../model/createLectureModel.js";
import { User } from "../model/userModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export const stripeSession = async (req, res) => {
  console.log("stripe session hit");
  try {
    const { courseId } = req.body;
    const userId = req.id;
    console.log("BODY:", req.body);
    console.log("COURSE ID:", courseId);
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "no course found" });
    }

    // creating new course purchasing record
    const makePurchase = new purchaseCourse({
      courseId,
      userId,
      amount: course.price,
      status: "pending",
    });

    // creating stripe checkout sesssions
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "pkr",
            product_data: {
              name: course.title,
              images: [course.thumbnail],
            },
            unit_amount: course.price * 100, // lowest unit
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONT_END_URL}/course-progress/${courseId}`,
      cancel_url: `${process.env.FRONT_END_URL}/courseinfo/${courseId}`,
      metadata: {
        courseId: courseId,
        userId: userId,
      },
      shipping_address_collection: {
        allowed_countries: ["JP"],
      },
    });
    if (!session.url) {
      return res.status(400).json({
        success: false,
        message: "some internal error or network issue",
      });
    }

    // saving purchase record
    makePurchase.paymentId = session.id;
    await makePurchase.save();

    return res.status(200).json({
      success: true,
      url: session.url,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// copied from gemini

// export const stripeWebhook = async (req, res) => {
//   console.log("webhook recieved: ");
//   let event;
//   try {
//     const secret = process.env.WEBHOOK_ENDPOINT_SECRET;

//     // 1. Ensure payload is a raw string/Buffer.
//     // If express.json() intercepted it, we have to stringify it back perfectly.
//     const payload =
//       typeof req.body === "string" || Buffer.isBuffer(req.body)
//         ? req.body
//         : JSON.stringify(req.body);

//     // 2. Generate the test header correctly using payloadString
//     const header = stripe.webhooks.generateTestHeaderString({
//       payloadString: payload.toString(),
//       secret,
//     });

//     // 3. Construct the event using the exact same payload string
//     event = stripe.webhooks.constructEvent(payload, header, secret);
//   } catch (error) {
//     // Look at your terminal console logs to see the exact message throwing here!
//     console.error("❌ Webhook Validation Failed:", error.message);
//     return res.status(400).send(`webhook error: ${error.message}`);
//   }

//   // 4. Handle the successful event
//   if (event.type === "checkout.session.completed") {
//     try {
//       const session = event.data.object;
//       const purchase = await purchaseCourse
//         .findOne({
//           paymentId: session.id,
//         })
//         .populate({ path: "courseId" });

//       if (!purchase) {
//         return res.status(404).json({ message: "purchase not found" });
//       }

//       console.log("Session ID:", session.id);
//       console.log("Purchase:", purchase);

//       if (session.amount_total) {
//         purchase.amount = session.amount_total / 100;
//       }
//       purchase.status = "completed";

//       if (purchase.courseId && purchase.courseId.lectures.length > 0) {
//         await Lecture.updateMany(
//           { _id: { $in: purchase.courseId.lectures } },
//           { $set: { isPreviewFree: true } },
//         );
//       }

//       console.log("status before saving : ", purchase.status);
//       await purchase.save();
//       console.log("status after saving :", purchase.status);

//       await User.findByIdAndUpdate(purchase.userId, {
//         $addToSet: { enrolledCourses: purchase.courseId._id },
//       });

//       await Course.findByIdAndUpdate(purchase.courseId._id, {
//         $addToSet: { enrolledStudents: purchase.userId },
//       });

//       return res.status(200).json({ received: true });
//     } catch (error) {
//       console.error("Fulfillment error:", error);
//       return res.status(500).json({ message: error.message });
//     }
//   }

//   // Acknowledge other events (charge.succeeded, etc.) so they return 200 OK
//   return res.status(200).json({ received: true });
// };

// // from chatpt
// export const stripeWebhook = async (req, res) => {
//   console.log("webhook received");

//   try {
//     const sig = req.headers["stripe-signature"];

//     const event = stripe.webhooks.constructEvent(
//       req.body,
//       sig,
//       process.env.WEBHOOK_ENDPOINT_SECRET
//     );

//     if (event.type === "checkout.session.completed") {
//       const session = event.data.object;

//       const purchase = await purchaseCourse
//         .findOne({ paymentId: session.id })
//         .populate("courseId");

//       if (!purchase) {
//         return res.status(404).json({ message: "purchase not found" });
//       }

//       purchase.status = "completed";

//       await purchase.save();

//       console.log("Payment completed successfully");

//       return res.status(200).json({ received: true });
//     }

//     return res.status(200).json({ received: true });

//   } catch (error) {
//     console.error("Webhook error:", error.message);
//     return res.status(400).send(`Webhook Error: ${error.message}`);
//   }
// };

// real one, self made:
//  export const stripeWebhook = async (req, res) => {
//     console.log("webhook recieved....................................................")
//     let event;
//     try {
//         const payload= JSON.stringify(req.body, null, 3)
//         const secret = process.env.WEBHOOK_ENDPOINT_SECRET

//         const header = stripe.webhooks.generateTestHeaderString({
//             payload: payload.toString(),
//             secret
//         });
//         event = stripe.webhooks.constructEvent(payload, header, secret)
//     } catch (error) {;
//         console.log(error)
//         return res.status(400).send(`webhook error: ${error.message}`)
//     }
//     if (event.type === "checkout.session.completed") {
//         try {
//             const session = event.data.object
//             const purchase = await purchaseCourse.findOne({
//                 paymentId:session.id,
//             }).populate({path:"courseId"});

//             if (!purchase) {
//                 return res.status(404).json({
//                     message:"purchase not found"
//                 })
//             }
//             if (session.amount_total) {
//                 purchase.amount = session.amount_total/100
//             }
//             purchase.status = "completed";

//             // now make free all the lectures of the course

//             if(purchase.courseId && purchase.courseId.lectures.length>0){
//                 await Lecture.updateMany(
//                     {_id:{$in : purchase.courseId.lectures }},
//                     { $set: {isPreviewFree:true}}
//                 )
//             }
//             await purchase.save()

//             // update user enrolled courses
//             await User.findByIdAndUpdate(
//                 purchase.userId,
//                 {
//                     $addToSet:{
//                         enrolledCourses:purchase.courseId._id
//                     }
//                 },
//                 {
//                     new:true
//                 }
//             )

//             // update Course to add user Id to enrolled students
//             await Course.findByIdAndUpdate(
//                 purchase.courseId._id,
//                 {
//                     $addToSet:{ enrolledStudents:purchase.userId} // add user id to enrolled courses
//                 },
//                 {
//                     new:true
//                 }
//             );
//             return res.status(200).json({ received: true });

//         } catch (error) {
//             console.log(error)
//             res.status(500).json({
//                 message:error.message
//             })
//         }
//     }
//     return res.status(200).json({ received: true });
// }

// another from chatgp:

export const stripeWebhook = async (req, res) => {
  console.log(
    "webhook received....................................................",
  );

  let event;

  try {
    const secret = process.env.WEBHOOK_ENDPOINT_SECRET;

    // ❌ DO NOT modify req.body
    // Stripe requires RAW body exactly as received
    const payload = req.body;

    // ❌ DO NOT generate fake test header
    // Instead use real Stripe signature header
    const signature = req.headers["stripe-signature"];

    // ✅ correct verification
    event = stripe.webhooks.constructEvent(payload, signature, secret);
  } catch (error) {
    console.log(" Webhook Validation Error:", error.message);
    return res.status(400).send(`webhook error: ${error.message}`);
  }

  // -----------------------------
  // YOUR EXISTING BUSINESS LOGIC
  // -----------------------------
  if (event.type === "checkout.session.completed") {
    try {
      const session = event.data.object;

      const purchase = await purchaseCourse
        .findOne({ paymentId: session.id })
        .populate({ path: "courseId" });

      if (!purchase) {
        return res.status(404).json({
          message: "purchase not found",
        });
      }

      console.log("Session ID:", session.id);

      if (session.amount_total) {
        purchase.amount = session.amount_total / 100;
      }

      purchase.status = "completed";

      // make lectures free
      if (purchase.courseId && purchase.courseId.lectures.length > 0) {
        await Lecture.updateMany(
          { _id: { $in: purchase.courseId.lectures } },
          { $set: { isPreviewFree: true } },
        );
      }

      console.log("status before saving:", purchase.status);
      await purchase.save();
      console.log("status after saving:", purchase.status);

      // update user
      await User.findByIdAndUpdate(purchase.userId, {
        $addToSet: {
          enrolledCourses: purchase.courseId._id,
        },
      });

      // update course
      await Course.findByIdAndUpdate(purchase.courseId._id, {
        $addToSet: {
          enrolledStudents: purchase.userId,
        },
      });

      return res.status(200).json({ received: true });
    } catch (error) {
      console.log("Fulfillment error:", error);
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  return res.status(200).json({ received: true });
};

export const getPurchaseDetailsWithStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const course = await Course.findById(courseId)
      .populate({ path: "creator" })
      .populate({ path: "lectures" });

    if (!course) {
      return res.status(404).json({
        message: "course not found",
      });
    }

    const purchased = await purchaseCourse.findOne({courseId, userId, status:"completed"})

    return res.status(200).json({
      course,
      purchased: !!purchased
    })
    
  } catch (error) {console.log(error)}
};


export const getUserPurchasedCourses = async (req, res) => {
  try {
    const {courseId} = req.params
    const userId = req.id

    const getPurchasedCourses = await purchaseCourse.find({status:"completed"}).populate("courseId")

    if (!getPurchasedCourses) {
      return res.status(404).json({
        // success:false,
        getPurchasedCourses:[],
        message:"no course purchased"
      })
    }

    return res.status(200).json({
      getPurchasedCourses,
    })
  } catch (error) {
    console.log(error)
  }
}
