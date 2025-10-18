import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import adminRouter from "./routes/adminRoute.js";
import documentRouter from "./routes/documentRoutes.js";
import visitorRouter from "./routes/visitorRoutes.js";
import residentRouter from "./routes/residentRoutes.js";
import announcementRouter from "./routes/announcementRoutes.js";
import contactRouter from "./routes/contactRoutes.js";
import maintenanceRouter from "./routes/maintenanceRoutes.js";
import complaintRouter from "./routes/complaintsRoute.js";

dotenv.config();

connectDB();

const app = express();

app.use(
  cors({
    origin: [
      "https://smart-gate-i7icl3rkt-mit-desais-projects.vercel.app",
      "https://smart-gate-smoky.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);

app.use("/uploads", express.static("uploads"));
app.use("/api/documents", documentRouter);
app.use("/api/visitors", visitorRouter);
app.use("/api/residents", residentRouter);
app.use("/api/announcements", announcementRouter);
app.use("/api/maintenance", maintenanceRouter);
app.use("/api/complaints", complaintRouter);

app.use("/api/contact", contactRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
