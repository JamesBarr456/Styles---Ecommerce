import mongoose from "mongoose";

type CardStatus = "active" | "completed";

export interface ICart {
  _id: string;
  userId: mongoose.Types.ObjectId | string;
  items: [
    {
      productId: mongoose.Types.ObjectId | string;
      quantity: number;
    }
  ];
  total_mount: number;
  status: CardStatus;
}
