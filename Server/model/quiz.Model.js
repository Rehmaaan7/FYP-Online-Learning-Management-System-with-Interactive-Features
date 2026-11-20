import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  options: [
    {
      type: String,
      required: true,
    },
  ],
  correctAnswer: {
    type: Number,
    required: true,
  },
});

const quizSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    timeLimit: {
      type: Number,
      default: 15,
    },
    questions: [QuestionSchema],
  },
  { timestamps: true },
);

export const Quiz = mongoose.model("Quiz", quizSchema);

const submissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  totalQuestions: {
    type: Number,
  },
  score: { type: Number, default: 0 },

  submittedAt: { type: Date, default: Date.now },
});

// Ensure a user can only submit a specific quiz once
submissionSchema.index({ userId: 1, quizId: 1 }, { unique: true });

export const Submitted = mongoose.model("Submitted", submissionSchema);
