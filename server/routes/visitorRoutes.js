import express from "express";
import { getVisitors, addVisitor, updateStatus, deleteVisitor } from "../controllers/visitorController.js";

const router = express.Router();

router.get("/", getVisitors);
router.post("/", addVisitor);
router.put("/:id/status", updateStatus);
router.delete("/:id", deleteVisitor);

export default router;
