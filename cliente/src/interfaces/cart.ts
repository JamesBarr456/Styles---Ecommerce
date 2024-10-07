//interface de item cart

import { IProduct } from "./product";

export interface ICartItem {
  product: IProduct;
  quantity: number;
  size: number[];
}
