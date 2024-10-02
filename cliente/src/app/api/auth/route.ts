import { ILogin, IRegister } from "@/app/interfaces/auth";
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
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Failed to login. Please try again.");
  }
};
