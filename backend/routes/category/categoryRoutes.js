import express from "express";
import {createCategory,getCategories,updateCategory,deleteCategory} from "../../controllers/categoryController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
import {validateCategory} from "../../validators/categoryValidator.js";

const router = express.Router();

router.post("/", authMiddleware, validateCategory, createCategory);
router.get("/", authMiddleware, getCategories);
router.put("/:id", authMiddleware, updateCategory);
router.delete("/:id", authMiddleware, deleteCategory);

export default router;
