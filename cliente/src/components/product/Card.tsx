import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";

interface Props {
  name: string;
  logo: string;
  img: string;
  price: number;
  discount: number;
}

export const CardProduct = ({ name, logo, img, price, discount }: Props) => {
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
            <Image
              src={logo}
              alt={`${name} logo`}
              fill
              sizes="(min-width: 768px) 40vw, 70vw"
              className="h-full w-full rounded-md object-contain"
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
            <Image
              src={img}
              alt={`${name} product image`}
              fill
              sizes="(min-width: 768px) 40vw, 70vw"
              className={`h-full w-full rounded-md object-cover`}
              priority
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
