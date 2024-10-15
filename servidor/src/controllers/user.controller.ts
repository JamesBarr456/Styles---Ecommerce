import { Request, Response } from "express";

import { userService } from "../services/user.services";

const { registerUser, loginUser, getUser, getUsers, deleteUser, updateUser } =
  userService;

class UserController {
  async registerUser(req: Request, res: Response) {
    const data = req.body;
    try {
      await registerUser(data);
      res.status(200).json({ message: "Register successfully" });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      return res.status(500).json({ message: errorMessage });
    }
  }

  async loginUser(req: Request, res: Response) {
    const data = req.body;
    try {
      const tokenWithUserData = await loginUser(data);
      res.setHeader("token", `${tokenWithUserData.token}`).status(200).json({
        message: "Login successfully",
        data: tokenWithUserData.user,
        token: tokenWithUserData.token,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      return res.status(500).json({ message: errorMessage });
    }
  }

  async getUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const user = await getUser(id);
      res.status(200).json({ message: "Get user successfully", data: user });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      return res.status(500).json({ message: errorMessage });
    }
  }

  async getUsers(_req: Request, res: Response) {
    try {
      const users = await getUsers();
      res
        .status(200)
        .json({ message: "Get profile successfully", data: users });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      return res.status(500).json({ message: errorMessage });
    }
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const user = await deleteUser(id);
      res.status(200).json({ message: "Delete successfully", data: user });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      return res.status(500).json({ message: errorMessage });
    }
  }
  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { data } = req.body;

    try {
      const user = await updateUser(id, data);
      res.status(200).json({ message: "Update successfully", data: user });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      return res.status(500).json({ message: errorMessage });
    }
  }
}

export const userController = new UserController();
