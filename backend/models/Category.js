import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true},
});

categorySchema.index({ userId: 1, name: 1 }, { unique: true });

const Category = mongoose.model("Category", categorySchema);
export { Category };
