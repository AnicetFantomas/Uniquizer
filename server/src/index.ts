import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "../routes/userRoutes";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("Database connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});

connect();

