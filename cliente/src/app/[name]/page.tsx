import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Heart, Minus, Plus, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import Image from "next/image";

const product = {
  name: "ADIDAS NEO 10k BLK-WHT",
  brand: {
    name: "adidas",
    image:
      "https://www.dropbox.com/scl/fi/kuut97qlikgbv2hiny4zz/adidass-150x150.png?rlkey=znic8u9t39niw82qv4vep2ql3&st=sqxofmea&raw=1",
  },
  description:
    "Un look de running renace. Estas zapatillas fusionan lona prelavada con revestimientos de gamuza sobre su exterior.\nLas 3 Tiras en cuero sintético y un contrafuerte de talón grande en TPU le ponen el toque final al look.\n\n- Exterior de malla con revestimientos de gamuza.\n- Doble cordón.\n- Las 3 Tiras en cuero sintético.\n- Contrafuerte de talón grande en TPU; logo adidas en el parche de talón.\n- Plantilla Comfort; cómodo forro interno de tela.\n- Mediasuela troquelada de EVA brinda amortiguación y ligereza.\n- Suela de caucho.",
  sku: "AD-NEO10K-BLK",
  price: 120000,
  size: ["38", "39", "40", "41", "42", "43"],
  category: "hombre",
  stock: 100,
  images: [
    "https://www.dropbox.com/scl/fi/hlanq8ohduixxecz85f14/ADIDAS-NEO-10K-BLACK-1.png?rlkey=lo566dcmmpuj9uj4juw6vhvqz&st=o832xy4n&raw=1",
    "https://www.dropbox.com/scl/fi/tlabws3a1s8akfwci82ih/ADIDAS-NEO-10K-BLACK-2.jpg?rlkey=ozfqplq1w56r3uj07knhbf0jc&st=74rg58r8&raw=1",
    "https://www.dropbox.com/scl/fi/yf7ukqv8z26zgonofui0y/ADIDAS-NEO-10K-BLACK-3.jpg?rlkey=t4ep8hxggbnlp4mwzax1bp53i&st=wr7f6ahj&raw=1",
  ],
  discount: 10,
};
export default function Detail() {
  const { discount, images, price, brand, name, size, sku, description } =
    product;

  const newPrice = discount > 0 ? price * (1 - discount / 100) : price;

  return (
    <section className="flex flex-col justify-center items-center p-5 gap-5">
      <div className="flex justify-between w-full ">
        <div className="relative h-14 w-14">
          <Image
            src={brand.image}
            alt={`${name} logo`}
            fill
            className="object-cover"
          />
        </div>
        <Button
          variant="ghost"
          className=" rounded-full p-2  h-10 hover:bg-orange-50 hover:text-orange-500"
        >
          <Heart />
        </Button>
      </div>

      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full px-5 max-w-sm"
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="relative h-72 w-full">
                <Image
                  src={image}
                  alt={`product image`}
                  fill
                  className="object-contain"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-5" />
        <CarouselNext className="-right-5" />
      </Carousel>
      <div className="flex flex-col gap-5">
        <h1 className="font-bold text-3xl">{name}</h1>
        <p className="text-xs">SKU: {sku}</p>
        <p className="text-blue-grayish-dark">{description}</p>

        <div className="font-bold flex justify-between lg:flex-col lg:gap-5">
          <p className="text-3xl flex items-center gap-4">
            ${newPrice.toLocaleString()}
            {discount > 0 && (
              <span className="bg-orange-pale text-base text-orange px-2 py-1 rounded-md">
                {discount}%
              </span>
            )}
          </p>

          {discount > 0 && (
            <p className="text-blue-grayish font-bold line-through">
              ${price.toLocaleString()}
            </p>
          )}
        </div>

        <p>Seleccionar talle argentino</p>
        <div className="flex flex-wrap gap-2">
          {size.map((e, i) => (
            <TalleComponent key={i} size={e} />
          ))}
        </div>

        <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
          <div className="bg-orange-50 font-bold flex items-center justify-between p-3 gap-4 lg:w-[50%] rounded-lg">
            <Button
              variant="ghost"
              className="bg-orange-50 text-orange-500 hover:brightness-110"
            >
              <Minus size={22} />
            </Button>
            <span>0</span>
            <Button
              variant="ghost"
              className="bg-orange-50 text-orange-500 hover:brightness-110"
            >
              <Plus size={22} />
            </Button>
          </div>
          <div className="py-3 bg-orange rounded-md hover:brightness-110">
            <Button className="bg-black text-white font-bold w-full flex items-center gap-5 justify-center">
              <ShoppingCart size={22} />
              <p>Add to cart</p>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

const TalleComponent = ({ size }: { size: string | number }) => {
  return (
    <div className="w-10 h-10 border border-black rounded-full cursor-pointer flex items-center justify-center hover:border-orange hover:scale-110 hover:text-orange">
      <p className="">{size}</p>
    </div>
  );
};
