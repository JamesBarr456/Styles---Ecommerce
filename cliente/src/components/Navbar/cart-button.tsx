import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Carrito } from "../carrito/carrito";
import CartWithBadge from "../others/cart-with-badge";
import { Separator } from "../ui/separator";

export const IconCart = () => {
  return (
    <Sheet>
      <SheetTrigger className="relative rounded-full p-2 h-10 hover:bg-orange-50 hover:text-orange-500">
        <CartWithBadge />
      </SheetTrigger>
      <SheetContent className="bg-white w-full ">
        <SheetTitle>Carrito</SheetTitle>
        <Separator />
        <Carrito />
      </SheetContent>
    </Sheet>
  );
};