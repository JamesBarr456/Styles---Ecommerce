//interface de item cart
export interface IItems {
  _id: string;
  productId: string;
  quantity: number;
  size: number;
  total_mount: number;
}
export interface ICartItem {
  _id: string;
  useriId: string;
  items: IItems[];
  status: string;
}
