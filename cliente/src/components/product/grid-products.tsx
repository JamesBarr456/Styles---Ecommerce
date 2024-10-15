"use client";

import { useEffect, useState } from "react";

import { CardProduct } from "./Card";
import { IProduct } from "@/interfaces/product";
import Loading from "../others/Loading";
import { Paginations } from "../pagination/pagination";
import { getProducts } from "@/services/products";

interface Props {
  querys: {
    page?: string;
    genre?: string;
    priceRange?: string;
    size?: string;
  };
}
interface GetAllProductsResponse {
  products: IProduct[];
  totalPages: number;
  totalProducts: number;
}
export const GridProducts = ({ querys }: Props) => {
  const [products, setProducts] = useState<GetAllProductsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProductsApi = async () => {
      setLoading(true);
      try {
        const response = await getProducts(querys);
        setProducts(response);
      } catch (error) {
        setError("Error al cargar los productos");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getProductsApi();
  }, [querys]);

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;
  if (!products) return <p>No se encontraron productos</p>;
  return (
    <section className="flex flex-col px-3 gap-6 w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 ">
        {products.products.map((product, i) => (
          <CardProduct
            key={i}
            discount={product.discount}
            img={product.images[0]}
            logo={product.brand.image}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>
      <Paginations totalPages={products.totalPages} />
    </section>
  );
};
