import { cartController } from "../controllers/cart.controller";
import express from "express";

const cartRouter = express.Router();

const {
  createCart,
  deleteCartItem,
  getCart,
  updateCart,
  getCartByIdUser,
  updateCartDiscountPromo,
  getAllCartByUser,
} = cartController;

cartRouter.post("/add", createCart);

cartRouter.get("/:id", getCart);

cartRouter.get("/allUser/:id", getAllCartByUser);

cartRouter.get("/user/:id", getCartByIdUser);

cartRouter.delete("/delete/:id", deleteCartItem);

cartRouter.put("/update/:id", updateCart);

cartRouter.put("/update/discountPromo/:id", updateCartDiscountPromo);

export default cartRouter;
