import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userRepository from "../repositories/userRepository.js";

const register = async (userData) => {
  try {
    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error("Email is already in use.");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await userRepository.createUser({ ...userData, password: hashedPassword });

    // Return the created user (exclude the password for security)
    return { ...user.toObject(), password: undefined }; 
  } catch (error) {
    console.log(error.message);
    throw new Error("Registration failed: " + error.message);
  }
};

const login = async ({ email, password }) => {
  try {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" });  // Extended expiry time

    // Return the token along with user details (excluding password)
    return { token, user: { ...user.toObject(), password: undefined } };
  } catch (error) {
    console.log(error.message);
    throw new Error("Login failed: " + error.message);
  }
};

export default { register, login };
