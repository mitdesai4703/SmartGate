import mongoose from "mongoose";
import bcrypt from "bcrypt";
import connectDB from "./config/db.js";
import User from "./models/User.js";

const createAdmin = async () => {
  try {
    await connectDB();

    const existingAdmin = await User.findOne({ email: "mitdesai4703@gmail.com" });
    if (existingAdmin) {
      console.log("Admin already exists");
      await mongoose.connection.close();
      return;
    }

    
    const hashedPassword = await bcrypt.hash("desai4703", 10);

    const newAdmin = new User({
      name: "Admin",
      email: "mitdesai4703@gmail.com",
      password: hashedPassword, 
      role: "admin",
    });

    await newAdmin.save();
    console.log("Admin user created successfully!");
  } catch (err) {
    console.log("Error creating admin:", err);
  } finally {
    mongoose.connection.close();
  }
};

createAdmin();
