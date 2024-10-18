"use client";

import { ICartItem, IItems } from "@/interfaces/cart";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  addToCartAPI,
  getCartItemsAPI,
  removeItemFromCartAPI,
  updateCartItemAPI,
} from "@/services/cart";

import { useAuth } from "./AuthContext";

interface CartContextType {
  cartItems: ICartItem | null;
  loading: boolean;
  addItemToCart: (data: {
    userId: string;
    productId: string;
    quantity: number;
    size: number;
  }) => Promise<void>;
  updateItemInCart: (data: IItems) => Promise<void>;
  removeItemFromCart: (userId: string, itemId: string) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<ICartItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchCart() {
      try {
        if (user) {
          setLoading(true);
          const resp = await getCartItemsAPI(user._id);
          setCartItems(resp);
          setLoading(false);
        } else {
          setCartItems(null);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
        setLoading(false);
      }
    }
    fetchCart();
  }, [user]);

  const addItemToCart = async (data: {
    userId: string;
    productId: string;
    quantity: number;
    size: number;
  }) => {
    try {
      const response = await addToCartAPI(data);
      setCartItems(response);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const updateItemInCart = async (data: IItems) => {
    try {
      if (cartItems) {
        const response = await updateCartItemAPI(cartItems._id, data);

        setCartItems(response);
      }
    } catch (error) {
      console.error("Error updating item in cart:", error);
    }
  };

  const removeItemFromCart = async (userId: string, itemId: string) => {
    try {
      const response = await removeItemFromCartAPI(userId, { itemId });
      setCartItems(response);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        addItemToCart,
        updateItemInCart,
        removeItemFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
