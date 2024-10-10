"use client";

import { Button } from "../ui/button";
import { IProduct } from "@/interfaces/product";
import { QuantitySelector } from "../carrito/quantity";
import { SessionCheckModal } from "../others/SessionCheckModal";
import { ShoppingCart } from "lucide-react";
import { cx } from "class-variance-authority";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useQuantity } from "@/hooks/useQuantity";
import { useState } from "react";

interface Props {
  product: IProduct;
  sizes: number[];
}

export const SizeSelector = ({ sizes, product }: Props) => {
  const { isAuthenticated, user } = useAuth();
  const { addItemToCart } = useCart();
  const { decrement, increment, quantity } = useQuantity();
  const [sizeSelect, setSizeSelect] = useState<number>(0);
  const [openModal, setOpenModal] = useState(false);

  const handleSizeSelection = (size: number) => {
    setSizeSelect(size);
  };

  const discount = product.discount > 0 ? 1 - product.discount / 100 : 1;
  const total_price =
    product.discount > 0
      ? product.price * quantity * discount
      : product.price * quantity;

  const handleAddToCartOrLogin = async () => {
    if (isAuthenticated) {
      if (user && user._id) {
        try {
          const resp = await addItemToCart({
            productId: product._id,
            quantity: quantity,
            userId: user._id,
            size: sizeSelect,
            total_mount: total_price,
          });
          console.log(resp);
        } catch (error) {
          if (error instanceof Error) {
            console.log(error.message);
          }
        }
      } else {
        console.log("El usuario no tiene un ID válido.");
      }
    } else {
      setOpenModal(true);
    }
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
            onClick={handleAddToCartOrLogin}
            disabled={!sizeSelect || quantity === 0}
            className="bg-orange-500  p-7 rounded-xl hover:bg-orange-600 text-white transition-colors space-x-3 w-full"
          >
            <ShoppingCart size={22} />
            <p>Add to cart</p>
          </Button>
          <SessionCheckModal
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
          />
        </div>
      </div>
    </>
  );
};
