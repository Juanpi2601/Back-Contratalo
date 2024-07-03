import express from "express";
import dotenv from 'dotenv';
import '../DBConnection/DBconecction.js';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from "../routes/user.routes.js";
import serviceRoutes from '../routes/service.routes.js';
import WorkRoutes from "../routes/work.routes.js";

export const PORT = process.env.PORT || 8000;
export const ADMIN_KEY = process.env.ADMIN_KEY;
export const USER_KEY = process.env.USER_KEY;

const app = express();

dotenv.config();
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
    withCredentials: true,
  })
);

app.use("/user", userRoutes);
app.use('/services', serviceRoutes);
app.use("/work", WorkRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

