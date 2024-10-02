import cors from "cors";
import express from "express";
import router from "./routes";

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api", router);
export default app;
