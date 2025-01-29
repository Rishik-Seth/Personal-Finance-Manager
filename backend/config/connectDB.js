import mongoose from "mongoose";
import { MONGO_URI } from "./serverConfig.js";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected...");
  } catch (err) {
    console.error("Database connection error: ",err.message);
  }
};

export default connectDB;
