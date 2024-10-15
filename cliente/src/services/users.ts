import { ILogin, IRegister, IUser } from "@/interfaces/users";
import axios, { AxiosError } from "axios";

const url = "http://localhost:4000/api";

export const registerUser = async (newUser: IRegister) => {
  try {
    const response = await axios.post(`${url}/users/register`, newUser);
    return response;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Failed to register. Please try again.");
  }
};

export const loginUser = async (user: ILogin) => {
  try {
    const response = await axios.post(`${url}/users/login`, user);
    const token = response.data.token;
    const data = response.data.data;
    return { data, token };
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Failed to login. Please try again.");
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get(`${url}/users`);

    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Failed to login. Please try again.");
  }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await axios.delete(`${url}/users/delete/${id}`);
    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Failed to login. Please try again.");
  }
};

export const putUser = async (id: string, data: Partial<IUser>) => {
  try {
    const response = await axios.put(`${url}/users/update/${id}`, {
      data: data,
    });
    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Failed to login. Please try again.");
  }
};
