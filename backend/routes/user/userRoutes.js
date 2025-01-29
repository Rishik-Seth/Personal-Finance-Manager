import express from "express";
import { validateRegister, validateLogin } from "../../validators/userValidator.js";
import { registerUser, loginUser } from "../../controllers/userController.js";

const router = express.Router();

router.post("/register", validateRegister, registerUser); 
router.post("/login", validateLogin, loginUser);      

export default router;
