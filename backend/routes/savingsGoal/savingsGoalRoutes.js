import express from "express";
import savingsGoalController from "../../controllers/savingsGoalController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
import { validateCreateSavingsGoal, validateUpdateSavingsGoal } from "../../validators/savingsGoalValidator.js";

const router = express.Router();

router.post("/", validateCreateSavingsGoal, authMiddleware, savingsGoalController.createSavingsGoal);
router.get("/", authMiddleware, savingsGoalController.getSavingsGoal);
router.put("/:id", validateUpdateSavingsGoal, authMiddleware, savingsGoalController.updateSavingsGoal);
router.delete("/:id", authMiddleware, savingsGoalController.deleteSavingsGoal);

export default router;
