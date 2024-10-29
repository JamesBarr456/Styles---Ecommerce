import { IProduct } from "../types/IProduct";
import { Product } from "../models/product.model";
import mongoose from "mongoose";

class ProductDao {
  async createProduct(data: IProduct) {
    try {
      const newProduct = await Product.create(data);
      return newProduct;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async deleteProduct(productId: string) {
    try {
      const product = await Product.findByIdAndDelete(productId);
      return product;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async updateProduct(productId: string, updatedData: IProduct) {
    try {
      const product = await Product.findByIdAndUpdate(
        productId,
        { $set: updatedData },
        { new: true, runValidators: true }
      );
      return product;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async getProductById(productId: string) {
    try {
      const product = await Product.findById(
        new mongoose.Types.ObjectId(productId)
      );
      return product;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async getProductByName(productName: string) {
    try {
      const product = await Product.findOne({ name: productName });
      return product;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async getAllProducts(
    genre: string | undefined,
    brand: string | undefined,
    page: number | string | undefined,
    sort: Record<string, 1 | -1> | undefined,
    status: string | undefined,
    size: string | undefined,
    priceMax: number | undefined,
    priceMin: number | undefined,
    limit: number
  ) {
    try {
      const skip = (Number(page) - 1) * Number(limit);
      const filters = {
        ...(status ? { status } : {}),
        ...(brand ? { brand } : {}),
        ...(genre ? { genre } : {}),
        ...(size ? { size } : {}),
        ...(priceMin !== undefined && priceMax !== undefined
          ? { price: { $gte: priceMin, $lte: priceMax } }
          : {}),
      };

      const totalProducts = await Product.countDocuments(filters);

      const products = await Product.find(filters)
        .sort(sort)
        .limit(limit + skip)
        .skip(skip);

      const totalPages = Math.ceil(totalProducts / limit);
      return {
        products,
        totalPages,
        totalProducts,
      };
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
}
export const productDao = new ProductDao();
