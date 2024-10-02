import { IProduct } from "../types/IProduct";
import mongoose from "mongoose";

const productSchema = new mongoose.Schema<IProduct>(
  {
    sku: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    brand: {
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    size: {
      type: [Number],
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    discount: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      enum: ["hombre", "mujer", "kids"],
      default: "hombre",
    },
    status: {
      type: String,
      enum: ["disponible", "agotado", "discontinuado"],
      default: "disponible",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
