import { Schema, model } from "mongoose";

const cartSchema = new Schema(
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
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    total_mount: {
      type: Number,
      default: 0,
    }, // Total del carrito
    status: {
      type: String,
      enum: ["active", "completed"],
      default: "active",
    }, // Estado del carrito
  },
  { timestamps: true }
);

export const Cart = model("Cart", cartSchema);
