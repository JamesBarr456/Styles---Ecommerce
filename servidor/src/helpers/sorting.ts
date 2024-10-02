import { SortBy } from "../types/IProduct";

export const getSortObject = (sortBy: SortBy): Record<string, 1 | -1> => {
  switch (sortBy) {
    case "price_ascending":
      return { price: 1 };
    case "price_descending":
      return { price: -1 };
    case "alpha_ascending":
      return { name: 1 };
    case "alpha_descending":
      return { name: -1 };
    case "created_ascending":
      return { createdAt: 1 };
    case "created_descending":
      return { createdAt: -1 };
    default:
      return {}; // Retorna un objeto vacío si no se reconoce el sortBy
  }
};
