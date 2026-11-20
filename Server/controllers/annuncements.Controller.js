import express from "express";
import { Announcement } from "../model/systemAnnouncement.model.js";

export const createAnnouncement = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { message, isGlobal } = req.body;
    const userId = req.id;

    if (!message) {
      return res.status(400).json({
        message: "announcement message is required",
      });
    }
    if (!userId) {
      return res.status(400).json({
        message: "announcement creator is required",
      });
    }

    const announcement = new Announcement({
      message,
      courseId,
      isGlobal,
      createdBy: userId,
    });
    await announcement.save();

    return res.status(200).json({
      success: true,
      announcement,
      message: "announcement created successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const showAnnouncements = async (req, res) => {
  try {
    const {courseId} = req.params
    const announcements = await Announcement.find({
      $or: [
        {
          courseId,
        },
        { isGlobal: true },
      ],
    }).populate({ path: "createdBy", select: "name role" }).sort({createdAt:-1});
    if (!announcements) {
      return res.status(404).json({
        message: "no announcements found",
      });
    }
    return res.status(200).json({
      success: true,
      announcements,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteAnnouncement = async (req, res) => {
    try {
        const {announcementId} = req.params

        const deletingAnnouncement = await Announcement.findByIdAndDelete(announcementId)

        if (!deleteAnnouncement) {
            return res.status(400).json({
                message:"no announcement found to delete"
            })
        }
        return res.status(200).json({
            success:true,
            message:"announcement deleted successfully"
        })
    } catch (error) {
        console.log(error)
    }
}