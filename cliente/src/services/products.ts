import axios, { AxiosError } from "axios";

const url = "http://localhost:4000/api";

export const getProducts = async () => {
  try {
    const response = await axios.get(`${url}/products`);

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
