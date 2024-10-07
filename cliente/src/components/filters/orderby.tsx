"use client";

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const sortingOptions = [
  { key: "price_ascending", label: "Precio: Menor a Mayor" },
  { key: "price_descending", label: "Precio: Mayor a Menor" },
  { key: "alpha_ascending", label: "A-Z" },
  { key: "alpha_descending", label: "Z-A" },
  { key: "created_descending", label: "Más Nuevo al más Viejo" },
  { key: "created_ascending", label: "Más Viejo al más Nuevo" },
];

interface SortingSelectProps {
  onSortChange?: (sortKey: string) => void;
  defaultValue?: string;
}

function SortingSelect({
  onSortChange,
  defaultValue = sortingOptions[1].key,
}: SortingSelectProps) {
  const handleValueChange = (value: string) => {
    if (onSortChange) {
      onSortChange(value);
    } else {
      console.log("Sorting option changed:", value);
    }
  };

  return (
    <Select onValueChange={handleValueChange} defaultValue={defaultValue}>
      <SelectTrigger className="w-full rounded-xl border-none shadow-md">
        <SelectValue placeholder="Seleccionar orden" />
      </SelectTrigger>
      <SelectContent className="bg-white rounded-xl">
        <SelectGroup>
          <SelectLabel>Opciones de ordenamiento</SelectLabel>
          {sortingOptions.map((option) => (
            <SelectItem
              className="cursor-pointer"
              key={option.key}
              value={option.key}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default function Orderby() {
  const handleSortChange = (sortKey: string) => {
    console.log("New sorting key:", sortKey);
    // Here you would typically update your state or trigger a re-fetch of sorted data
  };

  return <SortingSelect onSortChange={handleSortChange} />;
}
