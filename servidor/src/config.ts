import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 4000;
export const MONGO_URL =
  process.env.MONGODB_URL || "mongodb://localhost:27017/shoesApp";
export const TOKEN_SECRET = process.env.TOKEN_JWT_SECRET || "animals";
