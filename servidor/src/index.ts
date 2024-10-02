import { PORT } from "./config";
import app from "./app";
import connectDB from "../db/dbConnect";

connectDB();

app.listen(PORT, () => {
  console.log(`Listen in port ${PORT}`);
});
