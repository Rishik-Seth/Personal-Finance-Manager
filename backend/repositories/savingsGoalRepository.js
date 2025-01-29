import SavingsGoal from "../models/SavingsGoal.js";

const createSavingsGoal = async (userId, goalAmount, targetDate, goalName) => {
  try {
    const goal = new SavingsGoal({ userId, goalAmount, targetDate, goalName });
    return await goal.save();
  } catch (error) {
    throw new Error("Error creating savings goal: " + error.message);
  }
};

const getSavingsGoalByUser = async (userId) => {
  try {
    return await SavingsGoal.find({ userId });
  } catch (error) {
    throw new Error("Error fetching savings goals for user: " + error.message);
  }
};

const updateSavingsGoal = async (goalId, updatedData) => {
  try {
    const goal = await SavingsGoal.findOneAndUpdate(
      { _id: goalId },
      updatedData,
      { new: true }
    );

    if (!goal) throw new Error("Savings goal not found or unauthorized.");
    return goal;
  } catch (error) {
    throw new Error("Error updating savings goal: " + error.message);
  }
};

const deleteSavingsGoal = async (goalId) => {
  try {
    const goal = await SavingsGoal.findOneAndDelete({ _id: goalId });

    if (!goal) throw new Error("Savings goal not found or unauthorized.");
    return goal;
  } catch (error) {
    throw new Error("Error deleting savings goal: " + error.message);
  }
};

const updateSavedAmount = async (userId, amount, transactionDate) => {
  try {
    // Ensure the transactionDate is valid
    const date = new Date(transactionDate);
    if (isNaN(date)) {
      throw new Error("Invalid transaction date.");
    }

    // Find all savings goals where targetDate > transactionDate
    const goalsToUpdate = await SavingsGoal.find({
      userId,
      targetDate: { $gt: date },
    });

    // Update savedAmount for all the relevant goals
    for (const goal of goalsToUpdate) {
      await SavingsGoal.updateOne(
        { _id: goal._id },
        { $inc: { savedAmount: amount } }
      );
    }

    return goalsToUpdate;
  } catch (error) {
    throw new Error("Error updating saved amount: " + error.message);
  }
};

export default {
  createSavingsGoal,
  getSavingsGoalByUser,
  updateSavingsGoal,
  deleteSavingsGoal,
  updateSavedAmount,
};
