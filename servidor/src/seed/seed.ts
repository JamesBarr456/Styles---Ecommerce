import { Product } from "../models/product.model";
import connectDB from "../../db/dbConnect";
import mongoose from "mongoose";
import products from "./products.json";

// Función para insertar los datos iniciales
const seedDatabase = async () => {
  try {
    // Conectar a la base de datos
    await connectDB();

    // Limpia la colección de productos antes de insertar los nuevos datos
    await Product.deleteMany({});

    // Inserta los productos
    await Product.insertMany(products);

    console.log("Datos iniciales de productos insertados correctamente.");
  } catch (error) {
    console.error("Error al insertar los datos iniciales de productos", error);
  } finally {
    // Cierra la conexión a la base de datos
    mongoose.connection.close();
  }
};

// Ejecuta la función para insertar los datos
seedDatabase();
