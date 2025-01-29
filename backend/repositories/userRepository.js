import User from "../models/User.js";

// Create a new user
const createUser = async (userData) => {
  try {
    return await User.create(userData);
  } catch (error) {
    throw new Error("Error creating user: " + error.message);
  }
};

// Find a user by email
const findByEmail = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    throw new Error("Error finding user by email: " + error.message);
  }
};

// Find a user by ID
const findById = async (userId) => {
  try {
    return await User.findById(userId);
  } catch (error) {
    throw new Error("Error finding user by ID: " + error.message);
  }
};

export default { createUser, findByEmail, findById };
