import { CardProduct } from "./Card";
import { IProduct } from "@/interfaces/product";
import { getProducts } from "@/services/products";

export const GridProducts = async () => {
  const products: IProduct[] = await getProducts();

  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 px-3">
      {products.map((product, i) => (
        <CardProduct
          key={i}
          discount={product.discount}
          img={product.images[0]}
          logo={product.brand.image}
          name={product.name}
          price={product.price}
        />
      ))}
    </section>
  );
};
