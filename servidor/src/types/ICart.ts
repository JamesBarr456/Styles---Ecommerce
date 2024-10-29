import mongoose from "mongoose";

type CartStatus = "active" | "completed";

export interface IItems {
  _id?: string;
  productId: mongoose.Types.ObjectId | string;
  name: string;
  image: string;
  quantity: number;
  size: number;
  price: number;
  total_mount: number;
  sku: string;
}

export interface ICart {
  _id: string;
  userId: mongoose.Types.ObjectId | string;
  items: IItems[];
  total_amount: number;
  promoCodeDiscount?: number;
  status: CartStatus;
}
