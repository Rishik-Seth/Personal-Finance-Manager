import Transaction from "../models/Transaction.js";
import SavingsGoal from "../models/SavingsGoal.js";
import { Category } from "../models/Category.js";

const getMonthlyReport = async (req, res) => {
  try {
    const { userId } = req.params;
    const { year, month } = req.query;

    if (!year || !month) {
      return res.status(400).json({ success: false, message: "Year and month are required." });
    }

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    // Fetch transactions for the month
    const transactions = await Transaction.find({
      userId,
      date: { $gte: startDate, $lte: endDate },
    });

    let categorizedExpenses = {};
    let totalIncome = 0;
    let totalExpenses = 0; 
    for (const tx of transactions) {
      if (tx.type === "income") {
        totalIncome += tx.amount;
      } else {
        totalExpenses += tx.amount;
      }
      // Fetch category name manually since .populate() may not work correctly
      const category = await Category.findById(tx.categoryId);
      const categoryName = category ? category.name : "Uncategorized";
      categorizedExpenses[categoryName] = (categorizedExpenses[categoryName] || 0) + tx.amount;
    }

    // Fetch savings goals progress
    const savings = await SavingsGoal.find({ userId });
    const totalSaved = savings.reduce((sum, goal) => sum + goal.savedAmount, 0);

    res.json({
      success: true,
      totalIncome,
      totalExpenses,
      totalSaved,
      categorizedExpenses, // Data for Pie Chart
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getYearlyReport = async (req, res) => {
  try {
    const { userId } = req.params;
    const { year } = req.query;

    if (!year) {
      return res.status(400).json({ success: false, message: "Year is required." });
    }

    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);

    const transactions = await Transaction.find({
      userId,
      date: { $gte: startDate, $lte: endDate },
    });

    let monthlyData = Array(12).fill(null).map(() => ({ income: 0, expenses: 0 }));

    for (const tx of transactions) {
      const month = new Date(tx.date).getMonth();
      if (tx.type === "income") {
        monthlyData[month].income += tx.amount;
      } else {
        monthlyData[month].expenses += tx.amount;
      }
    }

    res.json({ success: true, monthlyData }); // Data for Bar Chart
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default { getMonthlyReport, getYearlyReport };
