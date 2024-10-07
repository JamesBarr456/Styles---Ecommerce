import { Button } from "../ui/button";
import { ICartItem } from "@/interfaces/cart";
import Image from "next/image";
import { QuantitySelector } from "./quantity";
import { Trash } from "lucide-react";
import { useQuantity } from "@/hooks/useQuantity";

interface Props {
  item: ICartItem;
  onRemove: (productId: string) => void;
}

export const ItemCarrito = ({
  item: { product, quantity: quantity_product, size },
  onRemove,
}: Props) => {
  const { quantity, decrement, increment } = useQuantity({
    initialQuantity: quantity_product,
  });

  return (
    <>
      <div className="w-full flex justify-between items-center transition-all">
        <h1 className="text-lg truncate font-semibold">{product.name}</h1>
        <Button
          onClick={() => onRemove(product._id)}
          variant="ghost"
          size="icon"
          className="hover:bg-white hover:text-orange-500"
        >
          <Trash size={18} />
        </Button>
      </div>
      <div className="grid grid-cols-3">
        <div className="relative h-24 w-24 col-span-1 ">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover border  rounded-xl shadow-md"
          />
        </div>
        <div className="col-span-2 space-y-3">
          <p className="text-xs">Size: {size}</p>
          <p className="text-xs">SKU: {product.sku}</p>
          <div className="grid grid-cols-2">
            <QuantitySelector
              onDecrement={decrement}
              onIncrement={increment}
              quantity={quantity}
            />

            <div className="text-center">
              <h4 className="text-gray-400 text-sm">Total</h4>
              <p className="font-bold">{product.price * quantity}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
