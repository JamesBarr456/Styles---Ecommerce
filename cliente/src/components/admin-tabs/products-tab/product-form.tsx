"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Asterisk } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IProduct } from "@/interfaces/product";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const numberRegex = /^\d+$/;

interface Props {
  initData?: IProduct;
  onCreate?: (data: Partial<IProduct>) => void;
  onUpdate?: (id: string, data: Partial<IProduct>) => void;
}
export const ProductForm = ({ initData, onUpdate, onCreate }: Props) => {
  const [images, setImages] = useState<string[]>(initData?.images || []);
  const [sizes, setSizes] = useState<number[]>(initData?.size || []);

  const formSchema = z.object({
    name: z.string({ message: "Name is required" }),
    genre: z.enum(["hombre", "mujer", "kids"], {
      message: "Category is required",
    }),
    price: z
      .string({ message: "Price is required" })
      .regex(numberRegex, { message: "Price must contain only numbers" }),
    discount: z
      .string({ message: "Discount is required" })
      .regex(numberRegex, { message: "Discount must contain only numbers" }),
    stock: z
      .string({ message: "Stock is required" })
      .regex(numberRegex, { message: "Stock must contain only numbers" }),
    imageUrl: z.string().optional(),
    brand: z.object({
      name: z.string({ message: "Brand name is required" }),
      image: z.string().url({ message: "Invalid URL for brand" }),
    }),
    description: z.string({ message: "Description is required" }),
    sku: z.string({ message: "SKU is required" }),
    size: z.string().optional(),
  });

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initData?.name || "",
      genre: initData?.genre || "hombre",
      discount: initData?.discount.toString() || "0",
      imageUrl: "",
      price: initData?.price.toString() || "0",
      brand: initData?.brand || { name: "", image: "" },
      description: initData?.description || "",
      sku: initData?.sku || "",
      size: "",
      stock: initData?.stock.toString() || "0",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    if (images.length === 0) {
      form.setError("imageUrl", {
        type: "manual",
        message: "You must add at least one image URL",
      });
      return;
    }

    if (sizes.length === 0) {
      form.setError("size", {
        type: "manual",
        message: "You must add at least one size",
      });
      return;
    }

    const newProductForm = {
      name: data.name,
      genre: data.genre,
      discount: +data.discount,
      images: images,
      price: +data.price,
      brand: data.brand,
      description: data.description,
      sku: data.sku,
      size: sizes.sort().map(Number),
      stock: +data.stock,
    };

    try {
      if (!initData && onCreate) {
        onCreate(newProductForm);
      } else if (initData && onUpdate) {
        onUpdate(initData._id, newProductForm);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  const handleAddImage = () => {
    const imageUrl = form.getValues("imageUrl");
    if (imageUrl) {
      setImages([...images, imageUrl]);
      form.setValue("imageUrl", "");
    }
  };

  const handleAddSize = () => {
    const size = form.getValues("size");
    if (size) {
      setSizes([...sizes, +size]);
      form.setValue("size", "");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 font-poppins "
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-1">
                Name <Asterisk size={16} className="text-red-500" />
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-1">Genre</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="hombre">Hombre</SelectItem>
                  <SelectItem value="mujer">Mujer</SelectItem>
                  <SelectItem value="kids">Kids</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="brand.name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-1">
                Brand Name <Asterisk size={16} className="text-red-500" />
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="brand.image"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-1">
                Brand URL <Asterisk size={16} className="text-red-500" />
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-1">
                Description <Asterisk size={16} className="text-red-500" />
              </FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-1">
                Price <Asterisk size={16} className="text-red-500" />
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="discount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-1">Discount</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-1">
                Stock <Asterisk size={16} className="text-red-500" />
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sku"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="flex gap-1">
                SKU <Asterisk size={16} className="text-red-500" />
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
              <FormLabel className="text-xs text-gray-400">
                &#34;El SKU se genera tomando la abreviatura de la marca,
                seguido del modelo, y luego los colores. Por ejemplo, para la
                marca &#39;Adidas&#39;, el modelo &#39;Neo 10K&#39;, y el color
                &#39;Pink&#39;, el SKU sería: AD-NEO10K-PNK.&#34;
              </FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-1">
                Size <Asterisk size={16} className="text-red-500" />
              </FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <Input {...field} />
                  <Button type="button" onClick={handleAddSize}>
                    Add Size
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {sizes.length > 0 && (
          <div>
            <FormLabel>Added Sizes:</FormLabel>
            <ul className="list-disc pl-5">
              {sizes.map((size, index) => (
                <li key={index}>{size}</li>
              ))}
            </ul>
          </div>
        )}

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-1">
                Image URL
                <Asterisk size={16} className="text-red-500" />
              </FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <Input {...field} />
                  <Button type="button" onClick={handleAddImage}>
                    Add
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {images.length > 0 && (
          <div>
            <FormLabel>Added Images:</FormLabel>
            <ul className="list-disc pl-5">
              {images.map((url, index) => (
                <li key={index}>{url}</li>
              ))}
            </ul>
          </div>
        )}

        <Button type="submit" className="w-full">
          Save Product
        </Button>
      </form>
    </Form>
  );
};
