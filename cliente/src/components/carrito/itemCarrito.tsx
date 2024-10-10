import { useEffect, useState } from "react";

import { Button } from "../ui/button";
import { IItems } from "@/interfaces/cart";
import { IProduct } from "@/interfaces/product";
import Image from "next/image";
import { QuantitySelector } from "./quantity";
import { Trash } from "lucide-react";
import { getProductById } from "@/services/products";
import { useQuantity } from "@/hooks/useQuantity";

interface Props {
  item: IItems;
  userId: string;
  handleTrash: (userId: string, itemId: string) => void;
  handleUpdate: (data: IItems) => void;
}

export const ItemCarrito = ({
  item: { _id, productId, quantity: quantity_product, size, total_mount },
  handleTrash,
  handleUpdate,
  userId,
}: Props) => {
  const { quantity, decrement, increment } = useQuantity({
    initialQuantity: quantity_product,
  });

  const [product, setProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    async function getItem() {
      const res = await getProductById(productId);
      setProduct(res);
    }
    getItem();
  }, [productId]);

  useEffect(() => {
    if (!product) return;
    const discount = product.discount > 0 ? 1 - product.discount / 100 : 1;
    const data = {
      _id,
      size,
      quantity,
      productId: product._id,
      total_mount: product.price * discount * quantity,
    };

    handleUpdate(data);
  }, [quantity]);

  if (!product) return <p>No vino nada fijate</p>;

  const handleIncrement = () => {
    increment();
  };

  const handleDecrement = () => {
    decrement();
  };

  return (
    <>
      <div className="w-full flex justify-between items-center transition-all">
        <h1 className="text-lg truncate font-semibold">{product.name}</h1>
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
              onDecrement={handleDecrement}
              onIncrement={handleIncrement}
              quantity={quantity}
            />

            <div className="text-center">
              <h4 className="text-gray-400 text-sm">Total</h4>
              <p className="font-bold">${total_mount}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
