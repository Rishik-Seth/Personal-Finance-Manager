import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" }); // Token expires in 1 hour
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET); // Decodes and verifies the token
  } catch (err) {
    return null; 
  }
};
