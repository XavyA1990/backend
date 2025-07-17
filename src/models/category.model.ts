import mongoose from "mongoose";

let autoIncrement = 0;

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  order: { type: Number, default: function () { return ++autoIncrement; } },
  board: { type: mongoose.Schema.Types.ObjectId, ref: "Board", required: true },
});

categorySchema.pre("save", function (next) {
  if (this.isNew) {
    autoIncrement++;
    this.order = autoIncrement;
  }
  next();
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
