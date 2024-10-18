"use client";

// import { Button } from "../ui/button";

import { EmptyCarrito } from "./empty";
import { ItemCarrito } from "./item-carrito";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { SheetClose } from "../ui/sheet";
import { cn } from "@/lib/utils";
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
    <div className="h-[90%] space-y-8">
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
        <p className="font-bold text-2xl">Total</p>
        <p className="font-bold text-2xl">${price_total.toLocaleString()}</p>
      </div>
      <SheetClose asChild>
        <Link
          href="/cart"
          className={cn(
            "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:pointer-events-none disabled:opacity-50",
            "bg-primary text-primary-foreground hover:bg-primary/90",
            "h-10 px-4 py-2 w-full"
          )}
        >
          Finalizar Compra
        </Link>
      </SheetClose>
    </div>
  );
};
