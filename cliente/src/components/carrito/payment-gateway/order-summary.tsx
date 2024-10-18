"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { EmptyCarrito } from "../empty";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import OrderSummarySkeleton from "@/components/skeletons/order-summary-skeleton";
import { Tag } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { updateDiscountPromo } from "@/services/cart";
import { useCart } from "@/context/CartContext";

export const OrderSummary = () => {
  const { cartItems } = useCart();
  const [descuento, setDescuento] = useState(0);

  useEffect(() => {
    if (cartItems && cartItems.promoCodeDiscount) {
      setDescuento(cartItems.promoCodeDiscount);
    }
  }, [cartItems]);

  if (!cartItems) return <OrderSummarySkeleton />;

  const empty = cartItems.items.length === 0;

  const sub_total = cartItems.total_amount;

  const total = descuento > 0 ? sub_total : sub_total - descuento;

  const aplicarDescuento = async (codigo: string) => {
    try {
      if (codigo === "DESCUENTO10") {
        const discount = sub_total * 0.1;
        await updateDiscountPromo(cartItems._id, discount);
        setDescuento(discount);
        toast({
          title: "Descuento aplicado",
          description: "Se ha aplicado un 10% de descuento.",
        });
      } else {
        toast({
          title: "Código inválido",
          description: "El código de descuento no es válido.",
          variant: "destructive",
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };
  return (
    <>
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Resumen de la Orden</CardTitle>
        </CardHeader>
        <CardContent>
          {empty ? (
            <EmptyCarrito />
          ) : (
            <>
              <div className="space-y-4">
                {cartItems.items.map(
                  ({ name, quantity, total_mount, size, _id, image }) => (
                    <ItemOrderSummary
                      key={_id}
                      image={image}
                      name={name}
                      quantity={quantity}
                      total_mount={total_mount}
                      size={size}
                    />
                  )
                )}
              </div>
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${sub_total.toFixed(2)}</span>
                </div>
                {descuento > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Descuento:</span>
                    <span>-${descuento.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold mt-2">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              {descuento === 0 && (
                <div className="mt-4 space-y-4">
                  <Label htmlFor="codigoDescuento">Código de Descuento</Label>
                  <div className="flex gap-2">
                    <Input
                      id="codigoDescuento"
                      placeholder="Ingresa tu código"
                    />
                    <Button
                      onClick={() =>
                        aplicarDescuento(
                          (
                            document.getElementById(
                              "codigoDescuento"
                            ) as HTMLInputElement
                          ).value
                        )
                      }
                    >
                      Aplicar
                    </Button>
                  </div>
                  <p className="text-sm  flex items-center gap-4 text-center">
                    <Tag className="h-12 w-12" />
                    Si tienes un código de descuento, aplícalo antes de
                    completar tu compra para aprovechar el ahorro.
                  </p>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
};

interface Props {
  name: string;
  image: string;
  quantity: number;
  total_mount: number;
  size: number;
}
const ItemOrderSummary = ({
  name,
  image,
  quantity,
  total_mount,
  size,
}: Props) => {
  return (
    <div className="flex items-center space-x-4">
      <Image
        src={image}
        alt={name}
        width={50}
        height={50}
        className="rounded-md"
      />
      <div className="flex-1">
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">Size: {size}</p>
        <p className="text-sm text-gray-500">Cantidad: {quantity}</p>
      </div>
      <p className="font-semibold">${total_mount.toFixed(2)}</p>
    </div>
  );
};
