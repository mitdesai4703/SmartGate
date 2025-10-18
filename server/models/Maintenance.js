import mongoose from "mongoose";

const maintenanceSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    amount: { type: Number, required: true },
    dueDate: { type: Date, required: true },
    status: { type: String, enum: ["Pending", "Paid"], default: "Pending" },
    description: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const Maintenance = mongoose.models.maintenance || mongoose.model("maintenance", maintenanceSchema);
export default Maintenance;
