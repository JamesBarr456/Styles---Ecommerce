import { ICart } from "../types/ICart";
import { cartDao } from "../daos/cart.dao";
import { productDao } from "../daos/product.dao";

const { getProductById } = productDao;
const {
  addCart,
  deleteCart,
  getCartById,
  updateCart,
  // getCartByIdAndStatus
} = cartDao;

class CartServices {
  async createCart(data: {
    userId: string;
    productId: string;
    quantity: string;
  }) {
    const { userId, productId, quantity } = data;
    try {
      // const cart = await getCartByIdAndStatus(userId);
      // console.log(cart)
      // // El usuario tiene un carrito?
      // if (cart) {
      //   const existingItem = cart.items.find(
      //     (item) => item._id.toString() === productId
      //   );
      //   if (existingItem) {
      //     // Si el producto ya existe, incrementar la cantidad
      //     existingItem.quantity += data.quantity;
      //   } else {
      //     // Si no existe, agregar el nuevo producto al carrito
      //     cart.items.push({ _id: data._id, quantity: data.quantity });
      //   }

      //   // Recalcular el total del carrito
      //   const product = await getProductById(data._id);
      //   if (!product) throw new Error("Product not found");

      //   cart.total_mount += product.price * data.quantity;

      //   // Actualizar el carrito existente usando el DAO
      //   const updatedCart = await updateCart(cart._id, cart);
      //   return updatedCart;
      // }
      // Si no hay carrito activo, crear uno nuevo
      const product = await getProductById(productId);
      if (!product) throw new Error("Product not found");

      const newCart: Partial<ICart> = {
        userId: userId,
        items: [{ productId: productId, quantity: +quantity }],
        total_mount: product.price * +quantity,
        status: "active",
      };
      const createCart = await addCart(newCart);
      return createCart;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async deleteCart(id: string) {
    try {
      const cart = await deleteCart(id);
      return cart;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async updateCart(id: string, data: ICart) {
    try {
      const cart = await updateCart(id, data);
      return cart;
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
}

export const cartServices = new CartServices();
