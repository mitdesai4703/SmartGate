import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Complaint", complaintSchema);
