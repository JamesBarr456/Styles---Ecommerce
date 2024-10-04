import { Filterby } from "@/components/filters/filterby";
import Orderby from "@/components/filters/orderby";

export default function Products() {
  return (
    <main className="container flex flex-col items-center gap-5 my-5 ">
      <h1 className="text-xl font-bold">Mejores Ofertas</h1>
      <div className="grid grid-cols-2 w-full gap-5 px-5">
        <Orderby />
        <Filterby />
      </div>
    </main>
  );
}
