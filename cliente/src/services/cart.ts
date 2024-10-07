import { ICartItem } from "@/interfaces/cart";
import { IProduct } from "@/interfaces/product";

export const addToCart = (
  product: IProduct,
  quantity: number,
  size: number
) => {
  const cart: ICartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

  const existingItem = cart.find((item) => item.product._id === product._id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ product, quantity, size: [size] });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const getCartItems = () => {
  return JSON.parse(localStorage.getItem("cart") || "[]");
};

export const removeFromCart = (productId: string) => {
  let cart: ICartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
  cart = cart.filter((item) => item.product._id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
};

//   // Limpiar carrito en localStorage
//   export const clearCart = () => {
//     localStorage.removeItem("cart");
//   };

//   // Sincronizar el carrito con el backend
//   export const syncCartWithBackend = async (token: string) => {
//     const cartItems = getCartItems();
//     if (cartItems.length > 0) {
//       try {
//         await axios.post(
//           `${process.env.NEXT_PUBLIC_API_URL}/cart/sync`,
//           { items: cartItems },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             }
//           }
//         );
//         clearCart(); // Limpiar carrito de localStorage después de sincronizar
//       } catch (error) {
//         console.error("Error syncing cart with backend", error);
//       }
//     }
//   };
