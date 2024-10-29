import { Request, Response } from "express";

import { cartServices } from "../services/cart.services";

const {
  createCart,
  deleteCartItem,
  getCart,
  updateCart,
  getCartByIdUser,
  updateCartDiscountPromo,
  getAllCartByUser,
} = cartServices;

class CartController {
  async createCart(req: Request, res: Response) {
    const data = req.body;

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
      const Cart = await updateCart(id, data);
      return res
        .status(200)
        .json({ message: "Cart update successfully", data: Cart });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";

      return res.status(500).json({ error: errorMessage });
    }
  }
  async updateCartDiscountPromo(req: Request, res: Response) {
    const id = req.params.id;
    const data = req.body;
    try {
      const Cart = await updateCartDiscountPromo(id, data.discount);
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
  async getAllCartByUser(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const Cart = await getAllCartByUser(id);
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
