import { IUser } from "../types/IUser";
import { TOKEN_SECRET } from "../config";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { userDao } from "../daos/user.dao";

const {
  getUserByEmail,
  createUser,
  getUserById,
  getUsers,
  deleteUserById,
  updateUserById,
} = userDao;

class UserService {
  async registerUser(user: IUser) {
    const { email } = user;
    const foundEmail = await getUserByEmail(email);
    if (foundEmail) throw new Error(`Email already exists`);
    try {
      const newUser = await createUser(user);
      return newUser;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
  async loginUser(user: IUser) {
    const { email, password } = user;
    try {
      const isValidEmailUser = await getUserByEmail(email);
      if (!isValidEmailUser)
        throw new Error(`The email is incorrect or does not exist.`);

      const inValidPassword = await bcrypt.compare(
        password,
        isValidEmailUser.password
      );
      if (!inValidPassword) throw new Error(`Invalid Password`);

      const token = sign(
        {
          userId: isValidEmailUser._id,
        },
        TOKEN_SECRET!,
        { expiresIn: "1h" }
      );

      const user = isValidEmailUser;

      return {
        token: token,
        user: user,
      };
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async getUser(id: string) {
    try {
      const user = await getUserById(id);
      return user;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async getUsers() {
    try {
      const users = await getUsers();
      return users;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
  async deleteUser(id: string) {
    try {
      const user = await deleteUserById(id);
      return user;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
  async updateUser(id: string, dataUpdate: Partial<IUser>) {
    try {
      const user = await updateUserById(id, dataUpdate);
      return user;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
  async updatePasswordUser(
    id: string,
    currentPassword: string,
    newPassword: string
  ) {
    try {
      const user = await getUserById(id);
      if (!user) throw new Error("User no exist or is incorrect");

      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!isPasswordValid) {
        throw new Error("Current password is incorrect.");
      }
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      const updatedUser = await updateUserById(id, {
        password: hashedNewPassword,
      });
      return updatedUser;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}

export const userService = new UserService();
