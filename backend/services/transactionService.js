import transactionRepository from "../repositories/transactionRepository.js";
import savingsGoalRepository from "../repositories/savingsGoalRepository.js";

const createTransaction = async (userId, transactionData) => {
  try {
    // Create the transaction
    const transaction = await transactionRepository.createTransaction({
      ...transactionData,
      userId,
    });

    // Determine whether it's income or expense
    const amount = transaction.type === 'income' ? transaction.amount : -transaction.amount;

    // Call updateSavedAmount function to update the savings goals
    await savingsGoalRepository.updateSavedAmount(userId, amount, transaction.date);

    return transaction;
  } catch (error) {
    throw new Error('Error creating transaction: ' + error.message);
  }
};

const getTransactionsByUser = async (userId) => {
  try {
    return await transactionRepository.findTransactionsByUser(userId);
  } catch (error) {
    throw new Error('Error fetching transactions: ' + error.message);
  }
};

const updateTransaction = async (userId, transactionId, updates) => {
  try {
    // Get the original transaction before updating
    const originalTransaction = await transactionRepository.findTransactionById(transactionId, userId);
    if (!originalTransaction) throw new Error("Transaction not found or unauthorized.");
    
    // Update the transaction
    const transaction = await transactionRepository.updateTransaction(transactionId, userId, updates);
    if (!transaction) throw new Error("Failed to update the transaction.");
    
    // Compare the original and updated transaction amounts and types
    const originalAmount = originalTransaction.amount;
    const updatedAmount = updates.amount || originalTransaction.amount;
    const originalType = originalTransaction.type;
    const updatedType = updates.type || originalType;

    // Determine if the amount or type has changed
    if (originalAmount !== updatedAmount || originalType !== updatedType) {
      // Adjust the saved amount for the savings goals
      const originalAmountAdjustment = originalType === 'income' ? -originalAmount : originalAmount;
      const updatedAmountAdjustment = updatedType === 'income' ? updatedAmount : -updatedAmount;

      // Update savings goals by subtracting the original amount, then adding the updated amount
      await savingsGoalRepository.updateSavedAmount(userId, originalAmountAdjustment, originalTransaction.date);
      await savingsGoalRepository.updateSavedAmount(userId, updatedAmountAdjustment, transaction.date);
    }
    
    return transaction;
  } catch (error) {
    throw new Error('Error updating transaction: ' + error.message);
  }
};

const updateTransactionsByCategory = async (categoryId, newCategoryId) => {
  try {
    // Call the repository to update the transactions
    return await transactionRepository.updateTransactionsByCategory(categoryId, newCategoryId);
  } catch (error) {
    throw new Error('Error in updating transactions by category: ' + error.message);
  }
};

const deleteTransaction = async (userId, transactionId) => {
  try {
    // Get the transaction before deletion
    const transaction = await transactionRepository.findTransactionById(transactionId, userId);
    if (!transaction) throw new Error("Transaction not found or unauthorized.");
    
    // Determine the amount adjustment based on transaction type
    const amountAdjustment = transaction.type === 'income' ? -transaction.amount : transaction.amount;

    // Update the savings goals by subtracting the transaction amount
    await savingsGoalRepository.updateSavedAmount(userId, amountAdjustment, transaction.date);

    // Delete the transaction
    await transactionRepository.deleteTransaction(transactionId, userId);
    
    return transaction;
  } catch (error) {
    throw new Error('Error deleting transaction: ' + error.message);
  }
};

export default {
  createTransaction,
  getTransactionsByUser,
  updateTransaction,
  deleteTransaction,
  updateTransactionsByCategory,
};
