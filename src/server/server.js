import express from "express";
import dotenv from 'dotenv';
import'../../DBConnection/DBconecction.js'
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from "../routes/user.routes.js";

export const port = process.env.PORT || 8000;
export const ADMIN_KEY = process.env.ADMIN_KEY;
export const USER_KEY = process.env.USER_KEY;

const app = express();

dotenv.config();
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
    withCredentials: true,
  })
);

app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});