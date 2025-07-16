import mongoose from "mongoose";

const QuestionSchema = mongoose.Schema(
  {
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
    },
    question: {
      type: String,
    },
    answer: {
      type: String,
    },
    note: {
      type: String,
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const QuestionModel = mongoose.model("Question", QuestionSchema);
