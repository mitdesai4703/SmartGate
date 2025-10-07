import express from "express";
import {
  getResidents,
  getResidentById,
  createResident,
  updateResident,
  deleteResident,
} from "../controllers/residentController.js";

const router = express.Router();

router.get("/", getResidents);
router.get("/:id", getResidentById);
router.post("/", createResident);
router.put("/:id", updateResident);
router.delete("/:id", deleteResident);

export default router;
