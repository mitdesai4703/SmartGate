import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js'; 
import authRouter from "./routes/auth.js"
import taskRouter from "./routes/taskRoutes.js"
import documentRouter from "./routes/documentRoutes.js"
import visitorRouter from "./routes/visitorRoutes.js";
import residentRouter from "./routes/residentRoutes.js";

dotenv.config();


connectDB();

const app = express();


app.use(cors());
app.use(express.json());
app.use('/api/auth',authRouter)
app.use('/api/tasks',taskRouter);
app.use("/uploads", express.static("uploads"));
app.use('/api/documents',documentRouter);
app.use("/api/visitors", visitorRouter);
app.use("/api/residents", residentRouter);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
