interface Brand {
  name: string;
  image: string;
}

export interface IProduct {
  _id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  size: number[];
  stock: number;
  images: string[];
  discount: number;
  genre: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  brand: Brand;
}

export interface GetAllProductsResponse {
  products: IProduct[];
  totalPages: number;
  totalProducts: number;
}
