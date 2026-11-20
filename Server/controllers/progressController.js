import { CourseProgress } from "../model/ProgressSchema.Model.js";
import { Course } from "../model/coursesModel.js";

export const getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    let courseProgress = await CourseProgress.findOne({
      courseId,
      userId,
    }).populate("courseId");

    const courseData = await Course.findOne({ _id: courseId }).populate({
      path: "lectures",
    });
    if (!courseData) {
      return res.status(404).json({
        message: "course data not found",
      });
    }

    if (!courseProgress) {
      return res.status(200).json({
        data: {
          courseData,
          lectureProgress: [],
          completed: false,
        },
      });
    }

    return res.status(200).json({
      data: {
        courseData,
        lectureProgress: courseProgress.lectureProgress,
        completed: courseProgress.completed,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateLectureProgress = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;
    const userId = req.id;

    let courseProgress = await CourseProgress.findOne({ courseId, userId });

    if (!courseProgress) {
      // create new
      courseProgress = new CourseProgress({
        userId,
        courseId,
        completed: false,
        lectureProgress: [],
      });
    }

    const lectureIndex = courseProgress.lectureProgress.findIndex(
      (elements) => elements.lectureId === lectureId,
    );

    if (lectureIndex !== -1) {
      // lecture already exists
      courseProgress.lectureProgress[lectureIndex].viewed = true;
    } else {
      // add new
      courseProgress.lectureProgress.push({
        lectureId,
        viewed: true,
      });
    }

    // if all were complete

    const completedLecturesLength = courseProgress.lectureProgress.filter(
      (lectures) => lectures.viewed,
    ).length;

    const course = await Course.findById(courseId);

    if (course.lectures.length === completedLecturesLength) {
      courseProgress.completed = true;
    }

    courseProgress.save();

    return res.status(200).json({
      message: "lecture updated successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

// export const markCompleted = async function (req, res) {
//   try {
//     const { courseId } = req.params;
//     const userId = req.id;
// const course = await Course.findById(courseId);
// console.log("Course lectures =", course.lectures);

//     if (!course) {
//       return res.status(404).json({
//         message: "course not found",
//       });
//     }
//    console.log(
//       "Before Update = ",
//       JSON.stringify(courseProgress.lectureProgress, null, 2)
//     );

//      courseProgress.lectureProgress = course.lectures.map(
//       (lectureProgress) => (lectureProgress.viewed = true),
//     );

//     await courseProgress.save();

//      console.log(
//       "After Update = ",
//       JSON.stringify(courseProgress.lectureProgress, null, 2)
//     );

//     return res.status(200).json({
//       message: "course marked as completed",
//     });
//     console.log("mark completed controller is hit ....................")
//   } catch (error) {
//     console.log(error);
//     console.error(error)
//   }
// };


// // this is correct but for now I am commenting it 
// export const markCompleted = async (req, res) => {
//   try {
//     const { courseId } = req.params;
//     const userId = req.id;

//     const course = await Course.findById(courseId);

//     if (!course) {
//       return res.status(404).json({ message: "course not found" });
//     }

//     let courseProgress = await CourseProgress.findOne({
//       courseId,
//       userId,
//     });

//     if (!courseProgress) {
//       courseProgress = new CourseProgress({
//         courseId,
//         userId,
//         lectureProgress: [],
//         prevLectureProgress: [],
//         completed: false,
//       });
//     }
//     if (!courseProgress.completed) {
//       courseProgress.prevLectureProgress = courseProgress.lectureProgress.map(
//         (history) => ({
//           lectureId: history.lectureId,
//           viewed: history.viewed,
//         }),
//       );
//     }

//     courseProgress.lectureProgress = course.lectures.map((lectureId) => ({
//       lectureId: lectureId.toString(),
//       viewed: true,
//     }));

//     courseProgress.completed = true;

//     await courseProgress.save();

//     return res.status(200).json({
//       message: "course marked as completed",
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };



export const markCompleted = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "course not found" });
    }

    let courseProgress = await CourseProgress.findOne({
      courseId,
      userId,
    });

    if (!courseProgress) {
      courseProgress = new CourseProgress({
        courseId,
        userId,
        lectureProgress: [],
        prevLectureProgress: [],
        completed: false,
      });
    }

    
    courseProgress.prevLectureProgress =
      JSON.parse(JSON.stringify(courseProgress.lectureProgress));

    
    courseProgress.lectureProgress = course.lectures.map((id) => ({
      lectureId: id.toString(),
      viewed: true,
    }));

    courseProgress.completed = true;

    await courseProgress.save();

    return res.status(200).json({
      message: "course marked as completed",
    });
  } catch (error) {
    console.log("error in mark completed:", error);
  }
};




// export const markInCompleted = async function (req, res) {
//   try {
//     const { courseId } = req.params;
//     const userId = req.id;

//     let courseProgress = await CourseProgress.findOne({ courseId, userId });

//     if (!courseProgress) {
//       courseProgress = new CourseProgress({
//         courseId,
//         userId,
//         lectureProgress: [],
//         prevLectureProgress: [],
//         completed: false,
//       });
//     }

//     if (courseProgress.prevLectureProgress.length > 0) {
//       courseProgress.lectureProgress =
//         courseProgress.prevLectureProgress.map(l => ({
//           lectureId: l.lectureId,
//           viewed: l.viewed
//         }));
//     }

//     courseProgress.completed = false;

//     await courseProgress.save();

//     return res.status(200).json({
//       message: "course pregress restored ",
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };


export const markInCompleted = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    let courseProgress = await CourseProgress.findOne({
      courseId,
      userId,
    });

    if (!courseProgress) {
      return res.status(404).json({
        message: "course progress not found",
      });
    }

    if (
      courseProgress.prevLectureProgress &&
      courseProgress.prevLectureProgress.length > 0
    ) {
      courseProgress.lectureProgress =
        JSON.parse(JSON.stringify(courseProgress.prevLectureProgress));
    } else {
      console.log("no progress yet");
    }

    courseProgress.completed = false;

    await courseProgress.save();

    return res.status(200).json({
      message: "course progress restored",
    });
  } catch (error) {
    console.log("error in InCompelete :", error);
  }
};
