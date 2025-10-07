import Visitor from "../models/Visitor.js";

export const getVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find().sort({ createdAt: -1 });
    res.status(200).json(visitors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addVisitor = async (req, res) => {
  try {
    const newVisitor = new Visitor(req.body);
    const savedVisitor = await newVisitor.save();
    res.status(201).json(savedVisitor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const visitor = await Visitor.findById(req.params.id);
    if (!visitor) return res.status(404).json({ message: "Visitor not found" });

    visitor.status = status;
    if (status === "Checked Out") visitor.exitTime = new Date();
    await visitor.save();

    res.status(200).json(visitor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteVisitor = async (req, res) => {
  try {
    await Visitor.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Visitor deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
