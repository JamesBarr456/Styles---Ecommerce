import { IUser } from "../types/IUser";
import { User } from "../models/user.model";

class UserDao {
  async createUser(user: IUser) {
    try {
      const newUser = await User.create(user);
      return newUser;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
  async getUserByEmail(email: string) {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
  async getUserById(id: string) {
    try {
      const user = await User.findById(id);
      return user;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
  async getUsers() {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
  async deleteUserById(id: string) {
    try {
      const user = await User.findByIdAndDelete(id);
      return user;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async updateUserById(userId: string, dataUpdate: Partial<IUser>) {
    try {
      const userUpdate = await User.findByIdAndUpdate(
        userId,
        { $set: dataUpdate },
        { new: true, runValidators: true }
      );
      return userUpdate;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
}

export const userDao = new UserDao();
