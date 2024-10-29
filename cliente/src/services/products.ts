import axios, { AxiosError } from "axios";

import { IProduct } from "@/interfaces/product";

const url = "http://localhost:4000/api";
interface QueryParams {
  genre?: string;
  sort?: string;
  priceRange?: string;
  size?: string;
  page?: string;
}
export const getProducts = async (queryParams?: QueryParams) => {
  try {
    const response = await axios.get(`${url}/products`, {
      params: queryParams,
    });

    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Failed to register. Please try again.");
  }
};

export const getProduct = async (name: string) => {
  try {
    const response = await axios.get(`${url}/products/name/${name}`);

    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Failed to register. Please try again.");
  }
};

export const getProductById = async (id: string) => {
  try {
    const response = await axios.get(`${url}/products/${id}`);

    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Failed to register. Please try again.");
  }
};

export const deleteProductById = async (id: string) => {
  try {
    const res = await axios.delete(`${url}/products/delete/${id}`);
    return res.data.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Failed to register. Please try again.");
  }
};

export const addProductToApi = async (data: any) => {
  try {
    const res = await axios.post(`${url}/products/add`, data);
    return res.data.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Failed to register. Please try again.");
  }
};

export const putProductToApi = async (id: string, data: any) => {
  try {
    const res = await axios.put(`${url}/products/update/${id}`, data);
    return res.data.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Failed to register. Please try again.");
  }
};
