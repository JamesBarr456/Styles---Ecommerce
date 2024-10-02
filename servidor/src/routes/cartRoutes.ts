import { cartController } from "../controllers/cart.controller";
import express from "express";

const cartRouter = express.Router();

const { createCart, deleteCart, getCart, updateCart } = cartController;

cartRouter.post("/add", createCart);

cartRouter.get("/:id", getCart);

cartRouter.get("/delete/:id", deleteCart);

cartRouter.put("/update/:id", updateCart);

export default cartRouter;
