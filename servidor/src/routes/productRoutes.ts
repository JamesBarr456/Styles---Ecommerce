import express from "express";
import { productController } from "../controllers/product.controller";

const productRouter = express.Router();

const {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
  getProductById,
} = productController;

productRouter.post("/add", createProduct);

productRouter.get("/name/:name", getProduct);

productRouter.get("/:id", getProductById);

productRouter.get("/", getProducts);

productRouter.delete("/delete/:id", deleteProduct);

productRouter.put("/update/:id", updateProduct);

export default productRouter;
