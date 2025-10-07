import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    resident: { type: String, required: true },
    houseNo: { type: String, required: true },
    contactNumber: { type: String },
    noOfPersons: { type: Number, default: 1 },
    purpose: { type: String },
    remarks: { type: String },
    entryTime: { type: Date, default: Date.now },
    exitTime: { type: Date },
    status: {
      type: String,
      enum: ["Checked In", "Checked Out"],
      default: "Checked In",
    },
  },
  { timestamps: true }
);

const Visitor = mongoose.model("Visitor", visitorSchema);
export default Visitor;
