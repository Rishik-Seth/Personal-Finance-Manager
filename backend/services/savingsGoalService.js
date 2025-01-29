import savingsGoalRepository from "../repositories/savingsGoalRepository.js";

const createSavingsGoal = async (userId, goalAmount, targetDate, goalName) => {
  try {
    const goal = await savingsGoalRepository.createSavingsGoal(
      userId,
      goalAmount,
      targetDate,
      goalName,
    );
    return goal;
  } catch (error) {
    throw new Error('Error creating savings goal: ' + error.message);
  }
};

const getSavingsGoalByUser = async (userId) => {
  try {
    const goals = await savingsGoalRepository.getSavingsGoalByUser(userId);
    if (!goals || goals.length === 0) {
      throw new Error("No savings goals found for the user.");
    }
    return goals;
  } catch (error) {
    throw new Error('Error fetching savings goals: ' + error.message);
  }
};

const updateSavingsGoal = async (goalId, updatedData) => {
  try {
    const goal = await savingsGoalRepository.updateSavingsGoal(goalId, updatedData);
    if (!goal) {
      throw new Error("Savings goal not found or unauthorized.");
    }
    return goal;
  } catch (error) {
    throw new Error('Error updating savings goal: ' + error.message);
  }
};

const deleteSavingsGoal = async (goalId) => {
  try {
    const result = await savingsGoalRepository.deleteSavingsGoal(goalId);
    if (!result) {
      throw new Error("Savings goal not found.");
    }
    return { message: "Goal deleted successfully" };
  } catch (error) {
    throw new Error('Error deleting savings goal: ' + error.message);
  }
};

const updateSavedAmount = async (userId, amount) => {
  try {
    await savingsGoalRepository.updateSavedAmount(userId, amount);
    return { message: 'Saved amount updated successfully.' };
  } catch (error) {
    throw new Error('Error updating saved amount: ' + error.message);
  }
};

export default {
  createSavingsGoal,
  getSavingsGoalByUser,
  updateSavingsGoal,
  deleteSavingsGoal,
  updateSavedAmount,
};
