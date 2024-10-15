import { ICart, IItems } from "../types/ICart";

import { cartDao } from "../daos/cart.dao";

// import { productDao } from "../daos/product.dao";

// const { getProductById } = productDao;
const { addCart, deleteItem, getCartById, updateCart, getCartByIdAndStatus } =
  cartDao;

class CartServices {
  async createCart(data: {
    userId: string;
    productId: string;
    quantity: number;
    size: number;
    total_mount: number;
  }) {
    const { userId, productId, quantity, size, total_mount } = data;
    try {
      const cart = await getCartByIdAndStatus(userId);

      if (cart) {
        const existingItem = cart.items.find(
          (item) => item.productId.toString() === productId
        );
        if (existingItem) {
          existingItem.quantity += data.quantity;
        } else {
          cart.items.push({ productId, quantity, size, total_mount });
        }

        const newCart = await updateCart(cart._id, cart);
        return newCart;
      }

      const newCart: Partial<ICart> = {
        userId: userId,
        items: [
          { productId, quantity, size, total_mount: quantity * total_mount },
        ],
        status: "active",
      };
      const createCart = await addCart(newCart);
      return createCart;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async deleteCartItem(userId: string, data: { itemId: string }) {
    try {
      const cart = await getCartByIdAndStatus(userId);
      if (!cart)
        throw new Error(
          "Este usuario no tiene un carrito asociado para eliminar"
        );

      const newCart = await deleteItem(cart._id, data.itemId);
      return newCart;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async updateCart(id: string, data: IItems) {
    try {
      const cart = await getCartById(id);

      if (!cart) {
        throw new Error("Cart not found");
      }

      const item = cart.items.find((i) => i._id?.toString() === data._id);

      if (!item) {
        throw new Error("Item not found in cart");
      }

      item.quantity = data.quantity;
      item.total_mount = data.total_mount;

      const newCart = await updateCart(id, cart);

      return newCart;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async getCart(id: string) {
    try {
      const cart = await getCartById(id);
      return cart;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async getCartByIdUser(id: string) {
    try {
      const cart = await getCartByIdAndStatus(id);
      return cart;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
}

export const cartServices = new CartServices();
