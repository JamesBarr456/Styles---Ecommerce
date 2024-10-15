import { Request, Response } from "express";

import { cartServices } from "../services/cart.services";

const { createCart, deleteCartItem, getCart, updateCart, getCartByIdUser } =
  cartServices;

class CartController {
  async createCart(req: Request, res: Response) {
    const data = req.body; // { userId: "66eb2bd8dc58963e097401c8" , productId: "66eb30de8b7791ce2d5b1faf" , quantity: number }

    try {
      const newCart = await createCart(data);
      return res
        .status(200)
        .json({ message: "Cart create successfully", data: newCart });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";

      return res.status(500).json({ error: errorMessage });
    }
  }
  async deleteCartItem(req: Request, res: Response) {
    const id = req.params.id;
    const data = req.body;
    try {
      const newCart = await deleteCartItem(id, data);
      return res
        .status(200)
        .json({ message: "Item Cart delete successfully", data: newCart });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";

      return res.status(500).json({ error: errorMessage });
    }
  }
  async updateCart(req: Request, res: Response) {
    const id = req.params.id;
    const data = req.body;
    try {
      const Cart = await updateCart(id, data.items);
      return res
        .status(200)
        .json({ message: "Cart update successfully", data: Cart });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";

      return res.status(500).json({ error: errorMessage });
    }
  }

  async getCart(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const Cart = await getCart(id);
      return res.status(200).json({
        message: "The Cart was fetched successfully.",
        data: Cart,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";

      return res.status(500).json({ error: errorMessage });
    }
  }
  async getCartByIdUser(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const Cart = await getCartByIdUser(id);
      return res.status(200).json({
        message: "The Cart was fetched successfully.",
        data: Cart,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";

      return res.status(500).json({ error: errorMessage });
    }
  }
}

export const cartController = new CartController();
