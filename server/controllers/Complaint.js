import Complaint from "../models/Complaint.js";

export const getComplaints = async (req, res) => {
  try {
    const { userName } = req.query;
    const complaints = await Complaint.find(userName ? { userName } : {}).sort({
      createdAt: -1,
    });
    res.json(complaints);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch complaints" });
  }
};

export const createComplaint = async (req, res) => {
  try {
    const { userName, message } = req.body;
    const complaint = await Complaint.create({
      userName,
      message,
      status: "Pending",
    });
    res.status(201).json(complaint);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create complaint" });
  }
};

export const updateComplaintStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await Complaint.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ message: "Complaint not found" });

    res.json({ message: "Complaint updated successfully", complaint: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update complaint" });
  }
};
