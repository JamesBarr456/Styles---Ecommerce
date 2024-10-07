"use client";

import { Button } from "../ui/button";
import { IProduct } from "@/interfaces/product";
import { QuantitySelector } from "../carrito/quantity";
import { ShoppingCart } from "lucide-react";
import { addToCart } from "@/services/cart";
import { cx } from "class-variance-authority";
import { useQuantity } from "@/hooks/useQuantity";
import { useState } from "react";

interface Props {
  product: IProduct;
  sizes: string[] | number[];
}

export const SizeSelector = ({ sizes, product }: Props) => {
  const { decrement, increment, quantity } = useQuantity();
  const [sizeSelect, setSizeSelect] = useState<string | number>("");
  const handleSizeSelection = (size: string | number) => {
    setSizeSelect(size);
  };

  return (
    <>
      <p>Seleccionar talle argentino</p>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size, i) => (
          <Button
            key={i}
            onClick={() => handleSizeSelection(size)}
            variant={"outline"}
            className={cx("w-12 h-12", {
              "bg-orange-500 text-white hover:brightness-90 hover:bg-orange-500 hover:text-white":
                size === sizeSelect,
            })}
          >
            {size}
          </Button>
        ))}
      </div>

      <div className="grid grid-col-1 lg:grid-cols-2 lg:items-center gap-6 ">
        <QuantitySelector
          quantity={quantity}
          onDecrement={decrement}
          onIncrement={increment}
        />
        <div className="py-3 bg-orange rounded-md hover:brightness-110">
          <Button
            onClick={() => addToCart(product, quantity, sizeSelect)}
            disabled={!sizeSelect}
            className="bg-orange-500  p-7 rounded-xl hover:bg-orange-600 text-white transition-colors space-x-3 w-full"
          >
            <ShoppingCart size={22} />
            <p>Add to cart</p>
          </Button>
        </div>
      </div>
    </>
  );
};
