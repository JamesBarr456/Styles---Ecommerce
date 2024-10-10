import { ICart } from "../types/ICart";
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

  async updateCart(id: string, data: ICart) {
    try {
      const cart = await updateCart(id, data);
      return cart;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  // async updateQuantityItem(id: string, data: ICart) {
  //   try {
  //     // Encuentra el carrito por su ID
  //   const cart = await Cart.findById(cartId);
  //   if (!cart) {
  //     throw new Error("Cart not found");
  //   }

  //   // Encuentra el ítem dentro del carrito
  //   const item = cart.items.find((item) => item._id.toString() === itemId);
  //   if (!item) {
  //     throw new Error("Item not found in cart");
  //   }

  //   // Actualiza la cantidad del ítem
  //   item.quantity = newQuantity;

  //   // Aquí debes obtener el precio del producto. Supongamos que tienes una función `getProductPrice`
  //   const product = await getProductById(item.productId);
  //   const productPrice = product.price; // Ajusta esto según la estructura de tu producto
  //   item.total_mount = item.quantity * productPrice; // Calcula el nuevo total

  //   // Guarda los cambios en el carrito
  //   await cart.save(); // Guarda el carrito actualizado
  //   return cart; // Devuelve el carrito actualizado
  //   } catch (error) {
  //     throw Error((error as Error).message);
  //   }
  // }

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
