import MaintenanceFee from "../models/Maintenance.js";
import User from "../models/User.js";

export const getTickets = async (req, res) => {
  try {
    const { userName } = req.query;
    let tickets;

    if (userName) {
     
      const user = await User.findOne({ name: userName });
      if (!user) return res.json([]);
      tickets = await MaintenanceFee.find({ user: user._id }).populate("user", "name email");
    } else {
     
      tickets = await MaintenanceFee.find().populate("user", "name email");
    }

    res.json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


export const createTicket = async (req, res) => {
  try {
    const { userName, amount, dueDate, description } = req.body;

    if (!userName || !amount || !dueDate) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const user = await User.findOne({ name: userName });
    if (!user) return res.status(404).json({ message: "User not found" });

    const ticket = await MaintenanceFee.create({
      user: user._id,
      amount,
      dueDate,
      description,
      status: "Pending",
    });

    res.status(201).json(ticket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};