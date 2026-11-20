import express, { json, response } from "express";
import { Course } from "../model/coursesModel.js";
import { deleteMedia, deleteVideo, uploadMedia } from "../utils/cloudinary.js";
import { Lecture } from "../model/createLectureModel.js";

export const createCourse = async (req, res) => {
  try {
    const { title, category } = req.body;
    if (!title || !category) {
      return res.status(500).json({
        success: false,
        message: "title and category are required",
      });
    }

    const course = await Course.create({
      title,
      category,
      creator: req.id,
    });
    return res.status(201).json({
      course,
      success: true,
      message: "course created successfully",
    });
  } catch (error) {
    console.log("error occoured in courses controller :", error);
    return res.status(500).json({
      success: false,
      message: "course creation failed",
    });
  }
};
export const getCourses = async(req, res)=>{
  try {
    const courses = await Course.find({isPublished:true}).populate({path:"creator", select:"name photoUrl"})
    if (!courses) {
      return res.status(404).json({
        success:false,
        message:"no course found"
      })
      
    }
    return res.status(200).json({
      courses
    })
    
  } catch (error) {
    console.log("error is occurred in getCourses : ",error)
    return res.status(500).json({
      success:false,
      message:"getting courses failed"
    })
  }
}

// export const getSearchedCourses = async(req, res)=>{
//   try {
//     const {searchQeury = "", categories = [], sort = "" } = req.query
//     const searchCriteria = {
//       isPublished:true,
//       $or:[
//         { title: {$regex:searchQeury, $options:"i"}},
//         {subTitle:{$regex:searchQeury, $options:"i"}},
//         {category:{$regex:searchQeury, $options:"i"}}
//       ]
//     }

//     if (categories.length>0) {
//       searchCriteria.category = {$in:categories}
//     }
//     const sortCriteria = {}
//     if (sort ==="low") {
//       sortCriteria.price = -1
//     }else if (sort === "high") {
//       sortCriteria.price = 1
//     }
//     let  courses = await Course.find(searchCriteria).populate({path:"creator", select:"name photoUrl"}).sort(sortCriteria)
//     return res.status(200).json({
//       courses:courses || []
//     })

//   } catch (error) {
//     console.log(error)
//   }

// }



export const getSearchedCourses = async (req, res) => {
  try {
     let { searchQeury = "", categories = "", sort = "" } = req.query;

    categories = categories ? categories.split(",") : [];
    console.log("search quer  .................. = ",searchQeury)

    const courses = await Course.aggregate([
      {
        $match: {
          isPublished: true,
          $or: [
            { title: { $regex: searchQeury, $options: "i" } },
            { subTitle: { $regex: searchQeury, $options: "i" } },
            { category: { $regex: searchQeury, $options: "i" } }
          ]
        }
      },

      // ✅ Create relevance score
      {
        $addFields: {
          score: {
            $add: [
              {
                $cond: [
                  { $regexMatch: { input: "$title", regex: searchQeury, options: "i" } },
                  3,
                  0
                ]
              },
              {
                $cond: [
                  { $regexMatch: { input: "$subTitle", regex: searchQeury, options: "i" } },
                  2,
                  0
                ]
              },
              {
                $cond: [
                  { $regexMatch: { input: "$category", regex: searchQeury, options: "i" } },
                  1,
                  0
                ]
              }
            ]
          }
        }
      },

      // ✅ sort by relevance first
      { $sort: { score: -1 } }
    ]);

    // Optional: category filter (extra refinement)
    let filteredCourses = courses;

    if (categories.length > 0) {
      filteredCourses = courses.filter((course) =>
        categories.includes(course.category)
      );
    }

    // Optional: price sorting (applied AFTER search ranking)
    if (sort === "low") {
      filteredCourses.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      filteredCourses.sort((a, b) => b.price - a.price);
    }

    return res.status(200).json({
      courses: filteredCourses || []
    });

  } catch (error) {
    console.log("search error:", error);
    return res.status(500).json({
      message: "Search failed",
      success: false
    });
  }
};

export const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.id;
    const courses = await Course.find({ creator: userId });

    if (courses.length === 0) {
      return res.status(404).json({
        courses: [],
        message: "no courses found",
      });
    }
    return res.status(200).json({
      courses,
    });
  } catch (error) {
    console.log("error occoured in courses controller :", error);
    return res.status(500).json({
      success: false,
      message: "course creation failed",
    });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const { title, subTitle, description, category, level, price, isPublished } = req.body;
    const thumbnail = req.file;

    let course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "no course found",
        success: false,
      });
    }
    let updateThumbnail;
    if (thumbnail) {
      if (course.thumbnail) {
        const publicId = course.thumbnail.split("/").pop().split(".")[0];
        await deleteMedia(publicId);
      }
      updateThumbnail = await uploadMedia(thumbnail.path);
    }
    
    const parseIsPublished = isPublished === "true"

    const updatedData = {
      title,
      subTitle,
      description,
      category,
      level,
      price,
      isPublished:parseIsPublished
    };

    if (updateThumbnail) {
      updatedData.thumbnail = updateThumbnail?.secure_url;
    }

    course = await Course.findByIdAndUpdate(courseId, updatedData, {
      new: true,
    });

    return res.status(200).json({
      course,
      message: "course updated successfully",
    });
  } catch (error) {
    console.log("error occoured in update course middleware :", error);
    return res.status(500).json({
      message: "course updation faild",
      success: false,
    });
  }
};

export const getCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "course not found",
        success: false,
      });
    }

    return res.status(200).json({
      course,
    });
  } catch (error) {
    console.log("error from getCourse controller: ", error);
    return res.status(500).json({
      message: "fetching course failed",
      success: false,
    });
  }
};

export const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const courseId = req.params.courseId;

    if (!courseId || !lectureTitle) {
      return res.status(400).json({
        message: "title to lecture is required",
        success: false,
      });
    }

    const lecture = await Lecture.create({ lectureTitle });
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "course not found",
        success: false,
      });
    }
    course.lectures.push(lecture._id);
    console.log(course.level);
    await course.save();

    return res.status(201).json({
      course,
      success: true,
      message: "lecture to course added successfully",
    });
  } catch (error) {
    console.log("error in create Lecture controller ", error);
    return res.status(500).json({
      message: "failed to create lecture",
      success: false,
    });
  }
};

export const getLectures = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate("lectures");

    if (!course) {
      return res.status(404).json({
        message: "course not found",
        success: false,
      });
    }
    res.status(200).json({
      lectures: course.lectures,
    });
  } catch (error) {
    console.log("error in get Lectures controller ", error);
    return res.status(500).json({
      message: "failed to get lectures",
      success: false,
    });
  }
};

export const updateLecture = async (req, res) => {
  try {
    const { lectureTitle, videoInfo, isPreviewFree } = req.body;
    const { courseId, lectureId } = req.params;
    const lecture = await Lecture.findById(lectureId);

    // if (!lectureTitle && !videoInfo && !isPreviewFree) {
    //   return res.status(500).json({
    //     success:false,
    //     message:"nothing to upadte"
    //   })
    // }

    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: "lecture not found",
      });
    }
    if (lectureTitle) {
      lecture.lectureTitle = lectureTitle;
    }
    if (videoInfo?.lectureUrl && videoInfo?.publicId) {
      if (lecture.publicId) {
        await deleteVideo(lecture.publicId);
      };

      lecture.lectureUrl = videoInfo.lectureUrl;
      lecture.publicId = videoInfo.publicId;
    }
    if (isPreviewFree !== undefined) {
      lecture.isPreviewFree = isPreviewFree;
    }
    await lecture.save();

    const course = await Course.findById(courseId);

    if (course && !course.lectures.includes(lecture._id)) {
      course.lectures.push(lecture._id);
      await course.save();
    }
    return res.status(200).json({
      lecture,
      success: true,
      message: "lecture updated successfully",
    });
  } catch (error) {
    console.log("error from update lecture controller: ", error);
    return res.status(500).json({
      success: false,
      message: "updating lecture failed ",
    });
  }
};

export const deleteLecture = async (req, res) => {
  try {
    const lectureId = req.params.lectureId;
    const lecture = await Lecture.findByIdAndDelete(lectureId);

    if (!lecture) {
      return res.status(404).json({
        message: "no lecture found to delete",
      });
    }
    
    if (lecture.publicId) {
      await deleteVideo(lecture.publicId);
    }

    await Course.updateOne(
      { lectures: lectureId },
      { $pull: { lectures: lectureId } },
    );
    return res.status(200).json({
      success: true,
      message: "lecture removed successfully",
    });
  } catch (error) {
    console.log("error from delete lecture controller: ", error);
    return res.status(500).json({
      success: false,
      message: "deleting lecture failed ",
    });
  }
};

export const getLectureById = async (req, res) => {
  try {
    const lectureId = req.params.lectureId;

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: "lecture not found",
      });
    }
    return res.status(200).json({
      lecture,
      success: true,
    });
  } catch (error) {
    console.log("error from getLectureById controller: ", error);
    return res.status(500).json({
      success: false,
      message: "finding lecture failed ",
    });
  }
};

export const toglePublish = async (req, res) => {
  try {
    const courseId = req.params.courseId
    const {publish} = req.query
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({
        success:false,
        message:"course not found"
      })
      
    }
    // console.log("publish value:", publish)
    course.isPublished = publish === "true"
    await course.save()
    const pubStatus = publish === "true" ? "published" : "private"

    return res.status(200).json({
      success:true,
      message:`course is set ${pubStatus}`
    })
    
  } catch (error) {
    console.log("error in togle publish controller : ", error)
  }
}











