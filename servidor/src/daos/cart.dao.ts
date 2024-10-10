import { Cart } from "../models/cart.model";
import { ICart } from "../types/ICart";

class CartDao {
  async getCartById(cartId: string) {
    try {
      const cart = await Cart.findById(cartId);
      return cart;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async addCart(cart: Partial<ICart>) {
    try {
      const newCard = await Cart.create(cart);
      return newCard;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async updateCart(cartId: string, updatedData: Partial<ICart>) {
    try {
      const cart = await Cart.findByIdAndUpdate(
        cartId,
        { $set: updatedData },
        { new: true, runValidators: true }
      );
      return cart;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async deleteItem(cartId: string, itemId: string) {
    try {
      const newCart = await Cart.findByIdAndUpdate(
        cartId,
        {
          $pull: { items: { _id: itemId } },
        },
        { new: true }
      );
      return newCart;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async getCartByIdAndStatus(userId: string) {
    try {
      const cart = await Cart.findOne({ userId: userId, status: "active" });
      return cart;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
}

export const cartDao = new CartDao();
