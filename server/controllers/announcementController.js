import Announcement from "../models/Announcement.js";

export const createAnnouncement = async (req, res) => {
  try {
    console.log("Received POST /api/announcements:", req.body);

    const { title, message } = req.body;

    if (!title || !message) {
      return res.status(400).json({
        success: false,
        error: "Both title and message are required",
      });
    }

    const newAnnouncement = new Announcement({ title, message });
    await newAnnouncement.save();

    res.status(201).json({
      success: true,
      announcement: newAnnouncement,
    });
  } catch (error) {
    console.error("Error creating announcement:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, announcements });
  } catch (error) {
    console.error("Error fetching announcements:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, error: "ID is required" });
    }

    const deleted = await Announcement.findByIdAndDelete(id);

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, error: "Announcement not found" });
    }

    res.status(200).json({ success: true, message: "Announcement deleted" });
  } catch (error) {
    console.error("Error deleting announcement:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
