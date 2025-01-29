import Transaction from "../models/Transaction.js";

const createTransaction = async (transactionData) => {
  try {
    const transaction = new Transaction(transactionData);
    return await transaction.save();
  } catch (error) {
    throw new Error("Error creating transaction: " + error.message);
  }
};

const findTransactionsByUser = async (userId) => {
  try {
    return await Transaction.find({ userId }).populate("categoryId");
  } catch (error) {
    throw new Error("Error fetching transactions for user: " + error.message);
  }
};

const findTransactionById = async (transactionId, userId) => {
  try {
    const transaction = await Transaction.findOne({ _id: transactionId, userId });
    if (!transaction) throw new Error("Transaction not found or unauthorized.");
    return transaction;
  } catch (error) {
    throw new Error("Error fetching transaction by ID: " + error.message);
  }
};

const updateTransaction = async (transactionId, userId, updates) => {
  try {
    const transaction = await Transaction.findOneAndUpdate(
      { _id: transactionId, userId },
      updates,
      { new: true }
    );

    if (!transaction) throw new Error("Transaction not found or unauthorized.");
    return transaction;
  } catch (error) {
    throw new Error("Error updating transaction: " + error.message);
  }
};

const deleteTransaction = async (transactionId, userId) => {
  try {
    const transaction = await Transaction.findOneAndDelete({ _id: transactionId, userId });

    if (!transaction) throw new Error("Transaction not found or unauthorized.");
    return transaction;
  } catch (error) {
    throw new Error("Error deleting transaction: " + error.message);
  }
};

const updateTransactionsByCategory = async (categoryId, newCategoryId) => {
  try {
    return await Transaction.updateMany(
      { categoryId }, // Find transactions with the deleted category
      { $set: { categoryId: newCategoryId } } // Update them to the new category
    );
  } catch (error) {
    throw new Error('Error updating transactions: ' + error.message);
  }
};

export default {
  createTransaction,
  findTransactionsByUser,
  findTransactionById,
  updateTransaction,
  deleteTransaction,
  updateTransactionsByCategory,
};
