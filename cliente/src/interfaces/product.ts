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
  category: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  brand: Brand;
}
