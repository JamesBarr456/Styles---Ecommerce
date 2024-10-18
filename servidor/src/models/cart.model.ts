import { Schema, model } from "mongoose";

import { ICart } from "../types/ICart";

const cartSchema = new Schema<ICart>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        sku: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        size: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        total_mount: {
          type: Number,
          required: true,
        },
      },
    ],
    total_amount: {
      type: Number,
      required: true,
      default: 0,
    },
    promoCodeDiscount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["active", "completed"],
      default: "active",
    },
  },
  { timestamps: true }
);

export const Cart = model("Cart", cartSchema);
