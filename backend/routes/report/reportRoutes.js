import express from "express";
import reportController from "../../controllers/reportController.js";

const router = express.Router();

router.get("/monthly/:userId", reportController.getMonthlyReport);
router.get("/yearly/:userId", reportController.getYearlyReport);

export default router;
