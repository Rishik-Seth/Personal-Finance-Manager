import categoryRepository from "../repositories/categoryRepository.js";
import transactionService from "./transactionService.js";

const createCategory = async (userId, categoryName) => {
  try {
    const category = await categoryRepository.createCategory(userId, categoryName);
    return category;
  } catch (error) {
    throw new Error("Error creating category: " + error.message);
  }
};

const getCategoriesByUser = async (userId) => {
  try {
    return await categoryRepository.findCategoryByUser(userId);
  } catch (error) {
    throw new Error("Error fetching categories: " + error.message);
  }
};

const getCategoryByName = async (name) => {
  try {
    return await categoryRepository.getCategoryByName(name);
  } catch (error) {
    throw new Error("Error fetching category by name: " + error.message);
  }
};

const updateCategory = async (categoryId, userId, categoryData) => {
  try {
    const category = await categoryRepository.updateCategory(categoryId, userId, categoryData);
    if (!category) throw new Error("Category not found or unauthorized.");
    return category;
  } catch (error) {
    throw new Error("Error updating category: " + error.message);
  }
};

const deleteCategory = async (userId, categoryId) => {
  try {

    // Check if the "Unknown" category exists, or create it if it doesn't
    let unknownCategory = await categoryRepository.getCategoryByName('Unknown');
    if (!unknownCategory) {
      unknownCategory = await categoryRepository.createCategory(userId, 'Unknown');
    }
    // Reassign all transactions with the deleted category to the "Unknown" category
    await transactionService.updateTransactionsByCategory(categoryId, unknownCategory.id);

    // Now delete the category

    const result = await categoryRepository.deleteCategory(categoryId);
    return { message: 'Category deleted successfully', result };
  } catch (error) {
    throw new Error('Error deleting category: ' + error.message);
  }
};

export default {
  createCategory,
  getCategoriesByUser,
  updateCategory,
  deleteCategory,
  getCategoryByName,
};
