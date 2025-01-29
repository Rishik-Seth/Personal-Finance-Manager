import mongoose from "mongoose";

const savingsGoalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    goalName: {
      type: String,
      required: true,
    },
    goalAmount: {
      type: Number,
      required: true,
    },
    savedAmount: {
      type: Number,
      default: 0,
    },
    targetDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "closed"], // Status of the goal
      default: "open",
    },
  },
);

export default mongoose.model("SavingsGoal", savingsGoalSchema);
