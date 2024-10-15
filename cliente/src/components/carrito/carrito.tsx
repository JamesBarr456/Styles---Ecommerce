"use client";

import { Button } from "../ui/button";
import { EmptyCarrito } from "./empty";
import { ItemCarrito } from "./itemCarrito";
import { Separator } from "../ui/separator";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export const Carrito = () => {
  const { user } = useAuth();
  const { cartItems, removeItemFromCart, updateItemInCart } = useCart();

  if (!cartItems || cartItems.items.length === 0) {
    return <EmptyCarrito />;
  }

  const price_total = cartItems.items.reduce((acc, item) => {
    return acc + item.total_mount;
  }, 0);

  if (!user) throw new Error("El usuario no existe, vuelva a loguearse");

  return (
    <div className="h-full space-y-8">
      <ul className="overflow-auto h-4/5">
        {cartItems?.items.map((item, i) => (
          <li key={i}>
            <ItemCarrito
              item={item}
              userId={user._id}
              handleTrash={removeItemFromCart}
              handleUpdate={updateItemInCart}
            />
          </li>
        ))}

        <Separator className="my-1" />
      </ul>
      <div className="flex justify-between w-full">
        <p className="font-bold text-xl">Total</p>
        <p className="font-bold text-xl">${price_total.toLocaleString()}</p>
      </div>
      <Button variant="default" className="p-7 w-full mt-5">
        <p>Finalizar Compra</p>
      </Button>
    </div>
  );
};
