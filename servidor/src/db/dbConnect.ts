import { MONGO_URL } from "../config";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  if (!MONGO_URL) {
    throw new Error(
      "MongoDB connection string is not defined in environment variables."
    );
  }

  try {
    await mongoose.connect(MONGO_URL);
    console.log(">>> DB is connected");
  } catch (error) {
    console.log("DB Connection Error", error);
  }
};

console.log("yo muestro la vairable de entorno", MONGO_URL);
export default connectDB;
