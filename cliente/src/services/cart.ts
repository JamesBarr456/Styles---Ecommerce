import axios, { AxiosError } from "axios";

import { IItems } from "@/interfaces/cart";

const url = "http://localhost:4000/api";

export const addToCartAPI = async (data: {
  userId: string;
  productId: string;
  quantity: number;
  size: number;
}) => {
  try {
    const response = await axios.post(`${url}/carts/add`, data);
    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Failed to register. Please try again.");
  }
};

export const removeItemFromCartAPI = async (
  userId: string,
  data: { itemId: string }
) => {
  try {
    const response = await axios.delete(`${url}/carts/delete/${userId}`, {
      data,
    });
    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Failed to register. Please try again.");
  }
};

export const getCartItemsAPI = async (userId: string) => {
  try {
    const response = await axios.get(`${url}/carts/user/${userId}`);
    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Failed to register. Please try again.");
  }
};

export const updateCartItemAPI = async (
  cartId: string,
  data?: Partial<IItems>,
  status?: "active" | "completed"
) => {
  try {
    const response = await axios.put(`${url}/carts/update/${cartId}`, {
      items: data,
      status,
    });

    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Failed to register. Please try again.");
  }
};

export const updateDiscountPromo = async (cartId: string, data: number) => {
  try {
    const response = await axios.put(
      `${url}/carts/update/discountPromo/${cartId}`,
      {
        discount: data,
      }
    );
    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Failed to register. Please try again.");
  }
};

export const getAllCartByUserAPI = async (userId: string) => {
  try {
    const response = await axios.get(`${url}/carts/allUser/${userId}`);
    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Failed to register. Please try again.");
  }
};
