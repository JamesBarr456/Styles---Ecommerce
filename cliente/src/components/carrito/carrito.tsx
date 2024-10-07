"use client";

import { useEffect, useState } from "react";

import { ICartItem } from "@/interfaces/cart";
import { ItemCarrito } from "./itemCarrito";
import { Separator } from "../ui/separator";
import { getCartItems } from "@/services/cart";

export const Carrito = () => {
  const [itemsCart, setItemsCart] = useState<ICartItem[]>([]);

  useEffect(() => {
    const storedCart = getCartItems();
    setItemsCart(storedCart);
  }, []);

  const handleRemoveItem = (productId: string) => {
    const updatedCart = itemsCart.filter(
      (item) => item.product._id !== productId
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setItemsCart(updatedCart);
  };
  if (itemsCart.length === 0) {
    return <p className="text-center">No hay productos agregados</p>;
  }

  return (
    <ul className="overflow-auto h-4/5">
      {itemsCart.map((item, i) => (
        <li key={i}>
          <ItemCarrito
            item={{
              product: item.product,
              quantity: item.quantity,
              size: item.size,
            }}
            onRemove={handleRemoveItem}
          />
        </li>
      ))}

      <Separator className="my-1" />
    </ul>
  );
};
