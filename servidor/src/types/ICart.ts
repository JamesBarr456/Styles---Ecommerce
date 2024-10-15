import mongoose from "mongoose";

type CardStatus = "active" | "completed";
export interface IItems {
  _id?: string;
  productId: mongoose.Types.ObjectId | string;
  quantity: number;
  size: number;
  total_mount: number;
}
export interface ICart {
  _id: string;
  userId: mongoose.Types.ObjectId | string;
  items: IItems[];
  status: CardStatus;
}
