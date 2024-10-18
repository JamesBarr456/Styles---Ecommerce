import { Button } from "../ui/button";
import { IItems } from "@/interfaces/cart";
import Image from "next/image";
import { QuantitySelector } from "./quantity";
import { Trash } from "lucide-react";
import { useEffect } from "react";
import { useQuantity } from "@/hooks/useQuantity";

interface Props {
  item: IItems;
  userId: string;
  handleTrash: (userId: string, itemId: string) => void;
  handleUpdate: (data: IItems) => void;
}

export const ItemCarrito = ({
  item: {
    _id,
    productId,
    quantity: quantity_product,
    size,
    total_mount,
    image,
    name,
    price,
  },
  handleTrash,
  handleUpdate,
  userId,
}: Props) => {
  const { quantity, decrement, increment } = useQuantity({
    initialQuantity: quantity_product,
  });

  useEffect(() => {
    if (quantity_product === quantity) {
      return;
    }
    const data = {
      _id,
      size,
      quantity,
      productId,
      total_mount,
      image,
      name,
      price,
    };

    handleUpdate(data);
  }, [quantity]);

  return (
    <>
      <div className="w-full flex justify-between items-center transition-all">
        <h1 className="text-lg truncate font-semibold">{name}</h1>
        <Button
          onClick={() => handleTrash(userId, _id)}
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
            src={image}
            alt={name}
            fill
            className="object-cover border  rounded-xl shadow-md"
          />
        </div>
        <div className="col-span-2 space-y-3 my-auto">
          <p className="font-semibold text-muted-foreground">Size: {size}</p>
          <div className="grid grid-cols-2">
            <QuantitySelector
              onDecrement={decrement}
              onIncrement={increment}
              quantity={quantity}
            />

            <div className="text-center">
              <h4 className="text-muted-foreground font-semibold text-sm">
                Total
              </h4>
              <p className="font-bold text-lg">
                ${total_mount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
