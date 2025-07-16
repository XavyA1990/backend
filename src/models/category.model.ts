import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  order: { type: Number, default: 0 },
  board: { type: mongoose.Schema.Types.ObjectId, ref: "Board", required: true },
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
