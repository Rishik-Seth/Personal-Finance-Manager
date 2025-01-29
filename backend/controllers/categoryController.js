import categoryService from "../services/categoryService.js";

const createCategory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name } = req.body;

    const category = await categoryService.createCategory(userId, name);
    return res.status(201).json({ success: true, category });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const userId = req.user.id;

    const categories = await categoryService.getCategoriesByUser(userId);
    return res.status(200).json({ success: true, categories });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const categoryData = req.body;
    const userId = req.user.id;

    const updatedCategory = await categoryService.updateCategory(categoryId, userId, categoryData);
    return res.status(200).json({ success: true, category: updatedCategory });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const userId = req.user.id;
    const result = await categoryService.deleteCategory(userId, categoryId);
    return res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { createCategory, getCategories, updateCategory, deleteCategory };
