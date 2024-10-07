import { Filterby } from "@/components/filters/filterby";
import { GridProducts } from "@/components/product/grid-products";
import Orderby from "@/components/filters/orderby";
import { Paginations } from "@/components/pagination/pagination";

export default function Products() {
  return (
    <main className="container mx-auto flex flex-col items-center gap-5 my-5">
      <h1 className="text-xl font-bold">Mejores Ofertas</h1>
      <div className="grid grid-cols-2 w-full lg:grid-cols-4 xl:grid-cols-8 lg:gap-5 px-5 ">
        <div className="lg:col-span-1 lg:order-3 xl:col-span-2">
          <Orderby />
        </div>
        <div className="lg:col-span-1 lg:order-4 xl:col-span-2">
          <Filterby />
        </div>
        <div className="lg:col-span-1"></div>
        <div className="lg:col-span-1"></div>
      </div>
      <GridProducts />
      <Paginations />
    </main>
  );
}
