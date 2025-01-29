import express from "express";
import userRoutes from "./user/userRoutes.js";
import categoryRoutes from "./category/categoryRoutes.js";
import transactionRoutes from "./transaction/transactionRoutes.js";
import savingsGoalRoutes from "./savingsGoal/savingsGoalRoutes.js";
import reportRoutes from "./report/reportRoutes.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/categories", categoryRoutes);
router.use("/transactions", transactionRoutes);
router.use("/savings-goals", savingsGoalRoutes);
router.use("/report", reportRoutes);

export default router;
