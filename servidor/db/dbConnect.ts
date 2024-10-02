import { MONGO_URI } from "../src/config";
import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    await mongoose.connect(MONGO_URI);
    console.log(">>> DB is connected");
  } catch (error) {
    console.log("DB Connection Error", error);
  }
};

export default connectDB;
