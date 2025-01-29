import savingsGoalService from "../services/savingsGoalService.js";

const createSavingsGoal = async (req, res) => {
  try {
    const { goalAmount, targetDate, goalName } = req.body;
    const userId = req.user.id;

    if (!goalAmount || !targetDate || !goalName) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const goal = await savingsGoalService.createSavingsGoal(userId, goalAmount, targetDate, goalName);
    return res.status(201).json({ success: true, goal });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getSavingsGoal = async (req, res) => {
  try {
    const userId = req.user.id;
    const goals = await savingsGoalService.getSavingsGoalByUser(userId);

    if (!goals || goals.length === 0) {
      return res.status(404).json({ success: false, message: "No savings goals found" });
    }

    return res.status(200).json({ success: true, goals });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateSavingsGoal = async (req, res) => {
  try {
    const goalId = req.params.id;
    const updatedData = req.body;

    const updatedGoal = await savingsGoalService.updateSavingsGoal(goalId, updatedData);

    if (!updatedGoal) {
      return res.status(404).json({ success: false, message: "Goal not found" });
    }

    return res.status(200).json({ success: true, goal: updatedGoal });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteSavingsGoal = async (req, res) => {
  try {
    const goalId = req.params.id;
    const result = await savingsGoalService.deleteSavingsGoal(goalId);

    if (!result) {
      return res.status(404).json({ success: false, message: "Goal not found" });
    }

    return res.status(200).json({ success: true, message: "Goal deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default {
  createSavingsGoal,
  getSavingsGoal,
  updateSavingsGoal,
  deleteSavingsGoal,
};
