import cartRouter from "./cartRoutes";
import express from "express";
import productRouter from "./productRoutes";
import userRouter from "./userRoutes";

const router = express.Router();

router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/carts", cartRouter);

export default router;
