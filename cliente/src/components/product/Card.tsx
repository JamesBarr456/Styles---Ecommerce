"use client";

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { useState } from "react";

interface Props {
  name: string;
  logo: string;
  img: string;
  price: number;
  discount: number;
}

export const CardProduct = ({ name, logo, img, price, discount }: Props) => {
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const hasDiscount = discount > 0;
  const productPriceWithDiscount = hasDiscount
    ? price * (1 - discount / 100)
    : price;

  const formattedPrice = price.toLocaleString();
  const formattedDiscountPrice = hasDiscount
    ? productPriceWithDiscount.toLocaleString()
    : null;
  return (
    <Link href={`/${name}`}>
      <Card className="w-full max-w-md mx-auto overflow-hidden group">
        <CardHeader className="grid grid-cols-2 items-center md:grid-cols-3 w-full p-3">
          <div className="relative h-11 w-11">
            {!logoLoaded && (
              <Skeleton className="absolute h-11 w-11 inset-0 z-10" />
            )}
            <Image
              src={logo}
              alt={`${name} logo`}
              fill
              className="object-cover"
              onLoadingComplete={() => setLogoLoaded(true)}
            />
          </div>

          {hasDiscount && (
            <span className="bg-orange-50 text-center text-xs font-bold text-orange-500 py-1 rounded-md">
              {discount}% OFF
            </span>
          )}
        </CardHeader>
        <CardContent className="p-3">
          <AspectRatio ratio={1 / 1} className="bg-muted">
            {!imageLoaded && <Skeleton className="absolute inset-0 z-10" />}
            <Image
              src={img}
              alt={`${name} product image`}
              fill
              className="h-full w-full rounded-md object-cover"
              onLoadingComplete={() => setImageLoaded(true)}
            />
          </AspectRatio>
        </CardContent>
        <CardFooter className="flex w-full flex-col items-start gap-3 p-3">
          <p className="text-left text-sm text-gray-700 font-semibold">
            {name}
          </p>
          <div className="flex w-full justify-between">
            <p className="text-orange-500 text-sm font-bold">
              $ {formattedDiscountPrice ?? formattedPrice}
            </p>
            {hasDiscount && (
              <p className="text-gray-400 font-bold text-xs line-through">
                $ {formattedPrice}
              </p>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
