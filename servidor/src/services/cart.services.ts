import { ICart, IItems } from "../types/ICart";

import { Product } from "../models/product.model";
import { cartDao } from "../daos/cart.dao";

const {
  addCart,
  getCartById,
  updateCart,
  getCartByIdAndStatus,
  getAllCartUser,
} = cartDao;

class CartServices {
  async createCart(data: {
    userId: string;
    productId: string;
    quantity: number;
    size: number;
  }) {
    const { userId, productId, quantity, size } = data;

    try {
      const [cart, product] = await Promise.all([
        getCartByIdAndStatus(userId),
        Product.findById(productId),
      ]);

      if (!product)
        throw new Error("El producto no existe en la base de datos");

      const discount = product.discount > 0 ? 1 - product.discount / 100 : 1;

      const total = product.price * quantity * discount;

      if (cart) {
        const existingItem = cart.items.find(
          (item) =>
            item.productId.toString() === productId && item.size === size
        );

        if (existingItem) {
          existingItem.quantity += quantity;
          existingItem.total_mount += product.price * quantity * discount;
        } else {
          cart.items.push({
            productId,
            quantity,
            size,
            total_mount: total,
            image: product.images[0],
            price: product.price,
            name: product.name,
            sku: product.sku,
          });
        }

        cart.total_amount += total;

        const updatedCart = cart.save();
        return updatedCart;
      }

      const newCart: Partial<ICart> = {
        userId: userId,
        items: [
          {
            productId,
            quantity,
            size,
            total_mount: total,
            name: product.name,
            image: product.images[0],
            price: product.price,
            sku: product.sku,
          },
        ],
        total_amount: total,
        status: "active",
      };

      const createCart = await addCart(newCart);
      return createCart;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async deleteCartItem(userId: string, data: { itemId: string }) {
    try {
      const cart = await getCartByIdAndStatus(userId);
      if (!cart) {
        throw new Error(
          "Este usuario no tiene un carrito asociado para eliminar"
        );
      }

      const updatedItems = cart.items.filter(
        (item) => item._id?.toString() !== data.itemId
      );

      if (updatedItems.length === cart.items.length) {
        throw new Error("El item a eliminar no se encontró en el carrito.");
      }

      cart.items = updatedItems;
      cart.total_amount = updatedItems.reduce(
        (acc, item) => acc + item.total_mount,
        0
      );
      const updatedCart = await cart.save();
      return updatedCart;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
  async updateCart(
    id: string,
    data: { items?: IItems; status?: "active" | "completed" }
  ) {
    try {
      const cart = await getCartById(id);

      if (!cart) {
        throw new Error("Cart not found");
      }

      if (data.status) {
        cart.status = data.status;
        await cart.save();
        return cart;
      }

      if (data.items) {
        const product = await Product.findById(data.items.productId);

        if (!product) {
          throw new Error(
            `El producto con ID ${data.items.productId} no existe en la base de datos`
          );
        }

        const item = cart.items.find(
          (i) => i._id?.toString() === data.items?._id
        );

        if (!item) {
          throw new Error(
            `Item con ID ${data.items._id} no encontrado en el carrito`
          );
        }

        const previousTotal = item.total_mount;
        const discount = product.discount > 0 ? 1 - product.discount / 100 : 1;
        item.quantity = data.items.quantity;
        item.total_mount = item.quantity * item.price * discount;

        cart.total_amount =
          cart.total_amount - previousTotal + item.total_mount;
      }

      const updatedCart = await updateCart(id, cart);

      return updatedCart;
    } catch (error) {
      throw new Error((error as Error).message);
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

  async getAllCartByUser(id: string) {
    try {
      const cart = await getAllCartUser(id);
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
  async updateCartDiscountPromo(cartId: string, discount: number) {
    try {
      const cart = await getCartById(cartId);

      if (!cart) {
        throw new Error("Cart not found");
      }

      cart.promoCodeDiscount = discount;

      const totalWithoutDiscount = cart.items.reduce(
        (acc, item) => acc + item.total_mount,
        0
      );

      cart.total_amount = totalWithoutDiscount * (1 - discount / 100);
      const updatedCart = await cart.save();
      return updatedCart;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}

export const cartServices = new CartServices();
