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
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Slider } from "../ui/slider";
import { SlidersHorizontal } from "lucide-react";

const dataFilter = {
  sizes: [34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46],
  genres: ["hombre", "mujer", "kids"],
};

export const Filterby = () => {
  const { genres, sizes } = dataFilter;
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState([0, 200000]);

  useEffect(() => {
    const genresFromUrl = searchParams.get("genre")?.split(",") || [];
    const sizesFromUrl = searchParams.get("size")?.split(",").map(Number) || [];
    const priceFromUrl = searchParams
      .get("priceRange")
      ?.split("-")
      .map((val) => (isNaN(Number(val)) ? 0 : Number(val))) || [0, 200000];

    setSelectedGenres(genresFromUrl);
    setSelectedSizes(sizesFromUrl);
    setPriceRange(priceFromUrl);
  }, [searchParams]);

  const handleGenreChange = (genre: string, checked: boolean) => {
    setSelectedGenres((prev) =>
      checked ? [...prev, genre] : prev.filter((g) => g !== genre)
    );
  };

  const handleSizeChange = (size: number, checked: boolean) => {
    setSelectedSizes((prev) =>
      checked ? [...prev, size] : prev.filter((s) => s !== size)
    );
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);

    if (selectedGenres.length) params.set("genre", selectedGenres.join(","));
    else params.delete("genre");

    if (selectedSizes.length) params.set("size", selectedSizes.join(","));
    else params.delete("size");

    if (priceRange[0] !== 0 || priceRange[1] !== 200000) {
      params.set("priceRange", priceRange.join("-"));
    } else {
      params.delete("priceRange"); // Si no ha sido modificado, se elimina de la query
    }

    params.set("page", "1");

    router.push(`?${params.toString()}`);
  };

  const clearFilters = () => {
    setSelectedGenres([]);
    setSelectedSizes([]);
    setPriceRange([0, 200000]);
    router.push("/products");
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
                  <Checkbox
                    id={genre}
                    checked={selectedGenres.includes(genre)}
                    onCheckedChange={(checked) =>
                      handleGenreChange(genre, checked as boolean)
                    }
                  />
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
                  <Checkbox
                    id={`${size}`}
                    checked={selectedSizes.includes(size)}
                    onCheckedChange={(checked) =>
                      handleSizeChange(size, checked as boolean)
                    }
                  />
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
        <SheetFooter className="gap-3">
          <SheetClose asChild>
            <Button type="submit" onClick={applyFilters}>
              Aplicar Filtros
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button variant="outline" onClick={clearFilters}>
              Limpiar Filtros
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
