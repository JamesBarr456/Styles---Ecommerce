import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT;
export const MONGO_URL = process.env.MONGODB_URL;
export const TOKEN_SECRET = process.env.TOKEN_JWT_SECRET;
