import { useState } from "react";

interface UseQuantityOptions {
  initialQuantity?: number;
  min?: number;
  max?: number;
}

export function useQuantity({
  initialQuantity = 0,
  min = 0,
  max = 99,
}: UseQuantityOptions = {}) {
  const [quantity, setQuantity] = useState(initialQuantity);

  const increment = () => {
    setQuantity((prev) => (prev < max ? prev + 1 : prev));
  };

  const decrement = () => {
    setQuantity((prev) => (prev > min ? prev - 1 : prev));
  };

  const resetQuantity = () => {
    setQuantity(initialQuantity);
  };

  return {
    quantity,
    increment,
    decrement,
    resetQuantity,
    setQuantity,
  };
}
