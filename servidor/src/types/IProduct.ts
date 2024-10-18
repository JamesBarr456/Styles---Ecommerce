export type ProductStatus = "disponible" | "agotado" | "discontinuado";
export type SortBy =
  | "price_ascending"
  | "price_descending"
  | "alpha_ascending"
  | "alpha_descending"
  | "created_descending"
  | "created_ascending";
type Genre = "hombre" | "mujer" | "kids";

export interface IProduct {
  _id: string; // Identificador único del producto
  name: string; // Nombre de la zapatilla
  brand: string; // Marca de la zapatilla
  description: string; // Descripción detallada del producto
  sku: string; //codigo de identificacion de la zapatilla
  price: number; // Precio de la zapatilla
  size: number[]; // Tallas disponibles
  color: string[]; // Colores disponibles
  genre: Genre; // Categoría a la que pertenece
  stock: number; // Cantidad disponible en inventario
  images: string[]; // URLs de las imágenes del producto
  discount: number; // Descuento en porcentaje, opcional
  status: ProductStatus; // Estado del producto
  createdAt: Date; // Fecha de creación del producto
  updatedAt: Date; // Fecha de la última actualización
}

export interface ISearchParams {
  genre?: string;
  brand?: string;
  sort_by?: SortBy;
  priceRange?: string;
  page?: string;
  size?: string;
  status?: ProductStatus;
}
