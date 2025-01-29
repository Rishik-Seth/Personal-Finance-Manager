import transactionService from "../services/transactionService.js";

const createTransaction = async (req, res) => {
  try {
    console.log("yo")
    const userId = req.user.id;
    const { amount, description, categoryId, type } = req.body;
    const date = new Date();

    if (!amount || !categoryId || !type) {
      return res.status(400).json({ success: false, message: "Amount, category, and type are required." });
    }
    console.log("userId", userId);
    const transaction = await transactionService.createTransaction(userId, {
      amount,
      description,
      date,
      categoryId,
      type,
    });

    return res.status(201).json({ success: true, message: "Transaction created successfully", transaction });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getTransactions = async (req, res) => {
  try {
    const userId = req.user.id;
    const transactions = await transactionService.getTransactionsByUser(userId);

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ success: false, message: "No transactions found." });
    }

    return res.status(200).json({ success: true, transactions });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const userId = req.user.id;
    const transactionId = req.params.id;
    const updates = req.body;

    const transaction = await transactionService.updateTransaction(userId, transactionId, updates);

    if (!transaction) {
      return res.status(404).json({ success: false, message: "Transaction not found." });
    }

    return res.status(200).json({ success: true, message: "Transaction updated successfully", transaction });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const userId = req.user.id;
    const transactionId = req.params.id;

    const result = await transactionService.deleteTransaction(userId, transactionId);

    if (!result) {
      return res.status(404).json({ success: false, message: "Transaction not found." });
    }

    return res.status(200).json({ success: true, message: "Transaction deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
};
