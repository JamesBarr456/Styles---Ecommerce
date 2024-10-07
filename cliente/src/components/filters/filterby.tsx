"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Slider } from "../ui/slider";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";

export const Filterby = () => {
  const { genres, sizes } = dataFilter;
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button asChild className="w-full rounded-xl cursor-pointer shadow-md">
          <div>
            <p className="mx-3">Filter</p>
            <SlidersHorizontal size={20} />
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-white">
        <SheetHeader>
          <SheetTitle>Filtros</SheetTitle>
        </SheetHeader>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Genero</AccordionTrigger>
            <AccordionContent className="space-y-2">
              {genres.map((genre, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <Checkbox id={genre} />
                  <label
                    htmlFor={genre}
                    className="text-sm capitalize font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {genre}
                  </label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Talle</AccordionTrigger>
            <AccordionContent className="space-y-2">
              {sizes.map((size, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <Checkbox id={`${size}`} />
                  <label
                    htmlFor={`${size}`}
                    className="text-sm capitalize font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {size}
                  </label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Gama de Precios</AccordionTrigger>
            <AccordionContent>
              <div className="w-full max-w-sm space-y-4">
                <h2 className="text-lg font-semibold">Rango de Precios</h2>
                <Slider
                  max={200000}
                  min={0}
                  step={10}
                  className="bg-orange-200"
                  minStepsBetweenThumbs={1}
                  onValueChange={handlePriceChange}
                  value={priceRange}
                />
                <div className="flex justify-between">
                  <span className="text-sm font-medium">
                    Mínimo: ${priceRange[0]}
                  </span>
                  <span className="text-sm font-medium">
                    Máximo: ${priceRange[1]}
                  </span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

const dataFilter = {
  sizes: [34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46],
  genres: ["hombre", "mujer", "kids"],
};
