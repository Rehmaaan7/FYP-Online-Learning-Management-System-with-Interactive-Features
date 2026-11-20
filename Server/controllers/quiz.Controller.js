import express from "express";
import { Quiz, Submitted } from "../model/quiz.Model.js";

export const createQuiz = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, timeLimit, questions } = req.body;

    if (!title) {
      return res.status(404).json({
        message: "title to quiz is required",
      });
    }
    if (!questions) {
      return res.status(400).json({
        message: "questions are required",
      });
    }

    const quiz = new Quiz({
      courseId,
      title,
      timeLimit,
      questions,
    });
    await quiz.save();
    return res.status(200).json({
      success: true,
      message: "quiz created successfully",
      quiz,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getQuizzes = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { userId } = req.id;

    const submittedQuizzes = await Submitted.find({ userId, courseId });
    const quizzes = await Quiz.find({ courseId })
      .populate({ path: "questions" })
      .sort({ createdAt: -1 });

    if (!quizzes) {
      return res.status(404).json({
        message: "no quizzes found",
      });
    }

    return res.status(200).json({
      success: true,
      quizzes,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({
        message: "quiz not found",
      });
    }

    return res.status(200).json({
      success: true,
      quiz,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const deletingQuiz = await Quiz.findById(quizId);
    if (!deletingQuiz) {
      return res.status(404).json({
        message: "no quiz found",
      });
    }
    await Quiz.findByIdAndDelete(quizId);
    return res.status(200).json({
      success: true,
      message: "quiz deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const attempQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { answers } = req.body;
    const userId = req.id;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({
        message: "no quiz found",
      });
    }
    const isSubmitted = await Submitted.findOne({ quizId, userId });

    if (isSubmitted) {
      return res.status(200).json({
        success: false,
        message: "you already have submitted this quiz",
      });
    }

    let score = 0;

    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score++;
      }
    });

    await Submitted.create({
      userId: req.id,
      quizId: quizId,
      totalQuestions:quiz.questions.length,
      score,
    });

    return res.status(200).json({
      success: true,
      result: {
        score,
        total: quiz.questions.length,
      },
    });
  } catch (error) {
    console.log(error);
  }
};


export const getResults = async (req, res) => {
    try {
        const {quizId} = req.params

        const results = await Submitted.find({quizId}).populate({path:"userId", select:"name email"}).populate({path:"quizId",select:"title questions"});
        if (results.length===0) {
            return res.status(404).json({
                message:"no results found"
            })
        }
        return res.status(200).json({
            success:true,
            results
        })
    } catch (error) {
        console.log(error)
    }
    
}