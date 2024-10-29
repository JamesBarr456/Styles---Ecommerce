import { Request, Response } from "express";

import { productService } from "../services/product.services";

const {
  getProduct,
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductById,
} = productService;

class ProductController {
  async createProduct(req: Request, res: Response) {
    const data = req.body;
    try {
      const newProduct = await createProduct(data);
      return res
        .status(200)
        .json({ message: "Product create successfully", data: newProduct });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";

      return res.status(500).json({ error: errorMessage });
    }
  }
  async deleteProduct(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const product = await deleteProduct(id);
      return res
        .status(200)
        .json({ message: "Product delete successfully", data: product });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";

      return res.status(500).json({ error: errorMessage });
    }
  }
  async updateProduct(req: Request, res: Response) {
    const id = req.params.id;
    const data = req.body;
    try {
      const product = await updateProduct(id, data);
      return res
        .status(200)
        .json({ message: "Product update successfully", data: product });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";

      return res.status(500).json({ error: errorMessage });
    }
  }

  async getProduct(req: Request, res: Response) {
    const name = req.params.name;
    try {
      const product = await getProduct(name);
      return res.status(200).json({
        message: "The product was fetched successfully.",
        data: product,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";

      return res.status(500).json({ error: errorMessage });
    }
  }

  async getProductById(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const product = await getProductById(id);
      return res.status(200).json({
        message: "The product was fetched successfully.",
        data: product,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";

      return res.status(500).json({ error: errorMessage });
    }
  }

  async getProducts(req: Request, res: Response) {
    const searchQuery = req.query;

    try {
      const products = await getProducts(searchQuery);
      return res
        .status(200)
        .json({ message: "Products was fetched successfully", data: products });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";

      return res.status(500).json({ error: errorMessage });
    }
  }
}

export const productController = new ProductController();
