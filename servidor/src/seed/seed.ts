import { Product } from "../models/product.model";
import { User } from "../models/user.model";
import connectDB from "../db/dbConnect";
import mongoose from "mongoose";
import products from "./products.json";
import users from "./users.json";

const seedDatabase = async () => {
  try {
    await connectDB();

    await Product.deleteMany({});
    await User.deleteMany({});

    await Product.insertMany(products);
    await User.insertMany(users);

    console.log("Datos iniciales de productos insertados correctamente.");
  } catch (error) {
    console.error("Error al insertar los datos iniciales de productos", error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
