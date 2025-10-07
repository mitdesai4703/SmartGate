import express from "express";
import { getDocuments, addDocument, deleteDocument, upload } from "../controllers/documentController.js";

const router = express.Router();

router.get("/", getDocuments);
router.post("/", upload.single("file"), addDocument);
router.delete("/:id", deleteDocument);

export default router;
