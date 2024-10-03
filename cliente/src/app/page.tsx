import { CardProduct } from "@/components/product/Card";
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
export default function Home() {
  const { discount, images, price, brand, name } = product;
  return (
    <div className="grid grid-cols-2 gap-3 px-5">
      <CardProduct
        discount={discount}
        img={images[0]}
        logo={brand.image}
        name={name}
        price={price}
      />
      <CardProduct
        discount={discount}
        img={images[0]}
        logo={brand.image}
        name={name}
        price={price}
      />
    </div>
  );
}
