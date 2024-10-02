import express from "express";
import { productController } from "../controllers/product.controller";

const productRouter = express.Router();

const { createProduct, deleteProduct, getProduct, getProducts, updateProduct } =
  productController;

productRouter.post("/add", createProduct);

productRouter.get("/:name", getProduct);

productRouter.get("/", getProducts);

productRouter.get("/delete/:id", deleteProduct);

productRouter.put("/update/:id", updateProduct);

export default productRouter;
