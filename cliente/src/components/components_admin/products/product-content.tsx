"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil, Plus, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  addProductToApi,
  deleteProductById,
  getProducts,
  putProductToApi,
} from "@/services/products";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { IProduct } from "@/interfaces/product";
import Image from "next/image";
import Loading from "@/components/others/Loading";
import { Paginations } from "@/components/pagination/pagination";
import { ProductForm } from "./product-form";

interface GetAllProductsResponse {
  products: IProduct[];
  totalPages: number;
  totalProducts: number;
}
export const ProductContent = () => {
  const [products, setProducts] = useState<GetAllProductsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProductsApi = async () => {
      setLoading(true);
      try {
        const response = await getProducts();
        setProducts(response);
      } catch (error) {
        setError("Error al cargar los productos");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getProductsApi();
  }, []);

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;
  if (!products) return <Loading />;

  const handleDeleteProduct = async (id: string) => {
    const resp: IProduct = await deleteProductById(id);
    setProducts(
      (prevState) =>
        prevState && {
          ...prevState,
          products: prevState.products.filter(
            (product) => product._id !== resp._id
          ),
        }
    );
  };
  const handleCreateProduct = async (data: Partial<IProduct>) => {
    await addProductToApi(data);
  };

  const handleUpdateProduct = async (id: string, data: Partial<IProduct>) => {
    await putProductToApi(id, data);
  };

  return (
    <>
      <div className="mt-4 flex justify-end items-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="overflow-auto h-3/4">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            {/* Componente del formulario de product */}
            <ProductForm onCreate={handleCreateProduct} />
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={50}
                  height={50}
                  className="rounded-md"
                />
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.genre}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.discount}%</TableCell>
              <TableCell>{product.status}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        // onClick={() => setSelectedProduct(product)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="overflow-auto h-3/4">
                      <DialogHeader>
                        <DialogTitle>Edit Product</DialogTitle>
                      </DialogHeader>
                      <ProductForm
                        onUpdate={handleUpdateProduct}
                        initData={product}
                      />
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Paginations totalPages={products.totalPages} />
    </>
  );
};
