import { cartController } from "../controllers/cart.controller";
import express from "express";

const cartRouter = express.Router();

const { createCart, deleteCartItem, getCart, updateCart, getCartByIdUser } =
  cartController;

cartRouter.post("/add", createCart);

cartRouter.get("/:id", getCart);

cartRouter.get("/user/:id", getCartByIdUser);

cartRouter.delete("/delete/:id", deleteCartItem);

cartRouter.put("/update/:id", updateCart);

export default cartRouter;
