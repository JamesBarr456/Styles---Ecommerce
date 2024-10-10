import { IProduct, ISearchParams } from "../types/IProduct";

import { getSortObject } from "../helpers/sorting";
import { productDao } from "../daos/product.dao";

const {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getProductByName,
  updateProduct,
} = productDao;

class ProductServices {
  async createProduct(data: IProduct) {
    try {
      const newProduct = await createProduct(data);
      return newProduct;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async deleteProduct(id: string) {
    try {
      const product = await deleteProduct(id);
      return product;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async updateProduct(id: string, data: IProduct) {
    try {
      const product = await updateProduct(id, data);
      return product;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async getProductById(id: string) {
    try {
      const product = await getProductById(id);
      return product;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async getProduct(name: string) {
    try {
      const product = await getProductByName(name);
      return product;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async getProducts(searchParams: ISearchParams) {
    const {
      brand,
      category,
      page = 1,
      priceRange,
      sort_by,
      size,
      status = "disponible",
    } = searchParams;

    const limit = 10;
    let priceMax: number | undefined;
    let priceMin: number | undefined;
    let sort = sort_by ? getSortObject(sort_by) : {};

    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number);
      priceMin = min;
      priceMax = max;
    }

    try {
      const products = await getAllProducts(
        category,
        brand,
        page,
        sort,
        status,
        size,
        priceMax,
        priceMin,
        limit
      );

      return products;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
}

export const productService = new ProductServices();
