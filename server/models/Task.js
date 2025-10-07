import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
  description: { type: String },
  status: { type: String, enum: ["Scheduled", "In Progress", "Completed"], default: "Scheduled" },
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);
export default Task;
