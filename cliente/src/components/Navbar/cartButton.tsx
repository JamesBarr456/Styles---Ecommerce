import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "../ui/button";
import { Carrito } from "../carrito/carrito";
import { Separator } from "../ui/separator";
import { ShoppingCart } from "lucide-react";

export const IconCart = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="rounded-full p-2 h-10 hover:bg-orange-50 hover:text-orange-500"
        >
          <ShoppingCart />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-white w-full ">
        <SheetTitle>Carrito</SheetTitle>
        <Separator />
        <Carrito />
        <SheetFooter>
          <Separator className="my-3" />
          <div className="flex justify-between w-full">
            <p className="font-bold text-xl">Total</p>
            <p className="font-bold text-xl">$79.999</p>
          </div>
          <Button variant="default" className="p-7 w-full mt-5">
            <p>COMPRAR AHORA</p>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
