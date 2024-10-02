import { loginSchema, registerSchema } from "../models/zod.model";

import express from "express";
import { userController } from "../controllers/user.controller";
import { validateDataUser } from "../middlewares/valid.user.middleware";

const userRouter = express.Router();

const { registerUser, loginUser, getUser, getUsers, deleteUser, updateUser } =
  userController;

userRouter.post("/register", validateDataUser(registerSchema), registerUser);

userRouter.post("/login", validateDataUser(loginSchema), loginUser);

userRouter.get("/:id", getUser);

userRouter.get("/", getUsers);

userRouter.get("/delete/:id", deleteUser);

userRouter.put("/update/:id", updateUser);

export default userRouter;
