import express from "express";
import { Forum } from "../model/Forums.Model.js";
import { Post } from "../model/Post.Model.js";

export const createForum = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title } = req.body;

    const userId = req.id;

    if (!title) {
      return res.status(404).json({
        message: "title is required",
      });
    }

    const forum = new Forum({
      courseId,
      title,
      createdBy: userId,
    });

    await forum.save();

    return res.status(200).json({
      success: true,
      forum,
      message: "forum created successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getForumByCourseId = async (req, res) => {
  try {
    const { courseId } = req.params;

    const courseForum = await Forum.find({ courseId });

    if (!courseForum) {
      return res.status(404).json({
        message: "no course forum found",
      });
    }

    return res.status(200).json({
      success: true,
      courseForum,
    });
  } catch (error) {
    console.log(error);
  }
};
export const createPost = async (req, res) => {
  try {
    const { forumId } = req.params;
    const { message } = req.body;

    const userId = req.id;

    const forum = await Forum.findById(forumId);
    if (!forum) {
      return res.status(404).json({
        success: false,
        message: "no forum was found",
      });
    }

    if (!message) {
      return res.status(404).json({
        message: "message is required",
      });
    }
    const post = new Post({
      forumId,
      autherId: userId,
      message,
    });
    await post.save();
    return res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getForumPosts = async (req, res) => {
  try {
    const { forumId } = req.params;

    const posts = await Post.find({ forumId })
      .populate({ path: "autherId", select: "name role" })
      .sort({ createdAt: -1 });

    if (!posts) {
      return res.status(200).json({
        message: "no posts yet, be the first to post",
      });
    }
    return res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deletePostFromForum = async (req, res) => {
  try {
    const { postId } = req.params;

    const deletingPost = await Post.findByIdAndDelete(postId);
    

    if (!deletingPost) {
      return res.status(404).json({
        message: "no post found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "post deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
