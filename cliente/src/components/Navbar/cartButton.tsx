import {
  Sheet,
  SheetContent,
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
        {/* {isAuthenticated && (
          <SheetFooter>
            <Separator className="my-3" />
           
          </SheetFooter>
        )} */}
      </SheetContent>
    </Sheet>
  );
};
