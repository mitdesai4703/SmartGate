import Resident from "../models/Resident.js";

export const getResidents = async (req, res) => {
  try {
    const residents = await Resident.find().sort({ createdAt: -1 });
    res.status(200).json(residents);
  } catch (err) {
    res.status(500).json({ message: "Error fetching residents", error: err });
  }
};

export const getResidentById = async (req, res) => {
  try {
    const resident = await Resident.findById(req.params.id);
    if (!resident)
      return res.status(404).json({ message: "Resident not found" });
    res.status(200).json(resident);
  } catch (err) {
    res.status(500).json({ message: "Error fetching resident", error: err });
  }
};

export const createResident = async (req, res) => {
  try {
    const newResident = new Resident(req.body);
    await newResident.save();
    res.status(201).json(newResident);
  } catch (err) {
    res.status(500).json({ message: "Error creating resident", error: err });
  }
};

export const updateResident = async (req, res) => {
  try {
    const updatedResident = await Resident.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedResident)
      return res.status(404).json({ message: "Resident not found" });
    res.status(200).json(updatedResident);
  } catch (err) {
    res.status(500).json({ message: "Error updating resident", error: err });
  }
};

export const deleteResident = async (req, res) => {
  try {
    const deletedResident = await Resident.findByIdAndDelete(req.params.id);
    if (!deletedResident)
      return res.status(404).json({ message: "Resident not found" });
    res.status(200).json({ message: "Resident deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting resident", error: err });
  }
};
