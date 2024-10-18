"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Truck, User } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { PaymentSkeleton } from "@/components/skeletons/payment-skeleton";
import { useCart } from "@/context/CartContext";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const numberRegex = /^\d+$/;
const formSchema = z.object({
  first_name: z.string().min(2, "First Name is required"),
  last_name: z.string().min(2, "Last Name is required"),
  number_phone: z.object({
    areaCode: z
      .string()
      .min(2, { message: "Code must be at least 2 digits" })
      .max(4, { message: "Code can't exceed 4 digits" })
      .regex(numberRegex, "Code must contain only numbers"),
    number: z
      .string()
      .min(6, { message: "Number must be at least 6 digits" })
      .max(10, { message: "Number can't exceed 10 digits" })
      .regex(numberRegex, "Phone number must contain only numbers"),
  }),
  email: z.string().email("Invalid email"),

  adress: z.string().min(5, "Address is required"),
  country: z.string().min(2, "Country is required"),
  province: z.string().min(2, "Province is required"),
  city: z.string().min(2, "City is required"),
  posta_code: z
    .string()
    .min(4, "Postal code must be at least 5 characters long"),

  cardholderName: z.string().min(2, "Cardholder name is required"),
  cardNumber: z.string().min(16, "Card number must be 16 digits"),
  expirationDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid date format (MM/YY)"),
  cvv: z.string().min(3, "CVV must be at least 3 digits"),
});

type FormData = z.infer<typeof formSchema>;

export const PaymentFormSteps = () => {
  const [activeStep, setActiveStep] = useState("personal");
  const { cartItems } = useCart();
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      number_phone: {
        areaCode: "",
        number: "",
      },
      email: "",
      adress: "",
      country: "",
      province: "",
      city: "",
      posta_code: "",
      cardholderName: "",
      cardNumber: "",
      expirationDate: "",
      cvv: "",
    },
  });

  if (!cartItems) return <PaymentSkeleton />;

  const isCartEmpty = !cartItems || cartItems.items.length === 0;

  const onSubmit = (data: FormData) => {
    if (isCartEmpty) {
      toast({
        title: "Carrito vacío",
        description: "No puedes realizar un pago con el carrito vacío.",
        variant: "destructive",
      });
      return;
    }

    const paymentData = {
      amount: cartItems?.total_amount,
      currency: "ARS",
      card: {
        number: data.cardNumber,
        expirationDate: data.expirationDate,
        cvv: data.cvv,
        cardholderName: data.cardholderName,
      },
      billingAddress: {
        street: data.adress,
        city: data.city,
        state: data.province,
        postalCode: data.posta_code,
        country: data.country,
      },
      orderId: cartItems?._id,
      customerEmail: data.email,
    };
    console.log(paymentData);
    toast({
      title: "Pago procesado",
      description: "Tu pago ha sido procesado exitosamente.",
    });
  };

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Proceso de Pago</CardTitle>
      </CardHeader>
      <CardContent>
        {isCartEmpty ? (
          <div className="text-center p-4">
            <h2 className="text-xl font-semibold mb-2">Carrito Vacío</h2>
            <p className="mb-4">
              No puedes realizar un pago con el carrito vacío.
            </p>
            <Button>
              <Link href={"/products"}>Volver a la Tienda</Link>
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Tabs value={activeStep} onValueChange={setActiveStep}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger
                    value="personal"
                    className="text-xs md:text-sm flex items-center justify-center"
                  >
                    <User className="w-4 h-4 mr-2 hidden md:block" />
                    Información Personal
                  </TabsTrigger>
                  <TabsTrigger
                    value="envio"
                    className="text-xs md:text-sm flex items-center justify-center"
                  >
                    <Truck className="w-4 h-4 mr-2 hidden md:block" />
                    Datos de Envío
                  </TabsTrigger>
                  <TabsTrigger
                    value="pago"
                    className="text-xs md:text-sm flex items-center justify-center"
                  >
                    <CreditCard className="w-4 h-4 mr-2 hidden md:block" />
                    Datos de Pago
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="personal">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="first_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="last_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Apellido</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-3 gap-2">
                      <FormField
                        control={form.control}
                        name="number_phone.areaCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex gap-1">
                              Código de área
                            </FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Código de área" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="number_phone.number"
                        render={({ field }) => (
                          <FormItem className="col-span-2">
                            <FormLabel className="flex gap-1">
                              Número de telefóno (sin 15)
                            </FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Número" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="envio">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="adress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Dirección</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>País</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona un país" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="es">España</SelectItem>
                              <SelectItem value="mx">México</SelectItem>
                              <SelectItem value="ar">Argentina</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <FormField
                        control={form.control}
                        name="province"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Provincia</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ciudad</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="posta_code"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Código Postal</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="pago">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="cardholderName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre del Titular</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cardNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Número de Tarjeta</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex gap-4">
                      <FormField
                        control={form.control}
                        name="expirationDate"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Fecha de Vencimiento</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="MM/AA" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="cvv"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>CVV</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              <Button type="submit" className="w-full">
                {activeStep === "pago" ? "Realizar Pago" : "Siguiente"}
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
};
