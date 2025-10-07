import Document from "../models/Document.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const dir = "uploads";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const upload = multer({ storage });

export const getDocuments = async (req, res) => {
  try {
    const docs = await Document.find().sort({ createdAt: -1 });
    res.status(200).json(docs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addDocument = async (req, res) => {
  try {
    const { name, uploadedBy } = req.body;
    const file = req.file;
    if (!file) return res.status(400).json({ message: "File is required" });

    const newDoc = new Document({
      name,
      uploadedBy,
      fileUrl: `/uploads/${file.filename}`,
      fileType: path.extname(file.originalname).replace(".", ""),
    });

    const savedDoc = await newDoc.save();
    res.status(201).json(savedDoc);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    await Document.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Document deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
