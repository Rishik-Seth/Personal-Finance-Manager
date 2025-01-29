import { Category } from "../models/Category.js";
import Transaction from "../models/Transaction.js";

const createCategory = async (userId, name) => {
  try {
    const existingCategory = await Category.findOne({ userId, name });
    if (existingCategory) {
      throw new Error("Category already exists for this user.");
    }
    const category = new Category({ userId, name });
    return await category.save();
  } catch (error) {
    throw new Error("Error creating category: " + error.message);
  }
};

const findCategoryByUser = async (userId) => {
  try {
    return await Category.find({ userId });
  } catch (error) {
    throw new Error("Error fetching categories for user: " + error.message);
  }
};

const findCategoryById = async (categoryId, userId) => {
  try {
    const category = await Category.findOne({ _id: categoryId, userId });
    if (!category) throw new Error("Category not found or unauthorized.");
    return category;
  } catch (error) {
    throw new Error("Error fetching category by ID: " + error.message);
  }
};

const findCategoryByName = async (userId, categoryName) => {
  try {
    return await Category.findOne({ userId, name: categoryName });
  } catch (error) {
    throw new Error("Error fetching category by name: " + error.message);
  }
};

const updateCategory = async (categoryId, userId, categoryData) => {
  try {
    const category = await Category.findOneAndUpdate(
      { _id: categoryId, userId },
      categoryData,
      { new: true }
    );
    if (!category) throw new Error("Category not found or unauthorized.");
    return category;
  } catch (error) {
    throw new Error("Error updating category: " + error.message);
  }
};

const deleteCategory = async (categoryId) => {
  try {
    const category = await Category.findOneAndDelete({ _id: categoryId });
    if (!category) throw new Error("Category not found or unauthorized.");
    return category;
  } catch (error) {
    throw new Error("Error deleting category: " + error.message);
  }
};

const getCategoryByName = async (name) => {
  try {
    return await Category.findOne({ name });
  } catch (error) {
    throw new Error("Error fetching category by name: " + error.message);
  }
};

const updateCategoryInTransactions = async (oldCategoryId, newCategoryId, userId) => {
  try {
    await Transaction.updateMany(
      { categoryId: oldCategoryId, userId },
      { $set: { categoryId: newCategoryId } }
    );
  } catch (error) {
    throw new Error("Error updating category in transactions: " + error.message);
  }
};

export default {
  createCategory,
  findCategoryById,
  findCategoryByName,
  updateCategory,
  deleteCategory,
  updateCategoryInTransactions,
  findCategoryByUser,
  getCategoryByName
};
