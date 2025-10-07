import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  uploadedBy: { type: String, required: true },
  fileUrl: { type: String, required: true },
  fileType: { type: String, required: true }, 
}, { timestamps: true });

const Document = mongoose.model("Document", documentSchema);
export default Document;
