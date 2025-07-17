import mongoose from "mongoose";

let autoIncrement = 0;

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  status: {
    type: String,
    enum: ["todo", "in-progress", "done"],
    default: "todo",
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  dueDate: { type: Date, default: null },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  color: { type: String, default: "#ffffff" },
  order: { type: Number, default: function () { return ++autoIncrement; } },
  assignee: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

taskSchema.pre("save", function (next) {
  if (this.isNew) {
    autoIncrement++;
    this.order = autoIncrement;
  }
  next();
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
