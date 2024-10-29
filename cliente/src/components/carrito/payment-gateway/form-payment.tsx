"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, CreditCard, Truck, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { useCart } from "@/context/CartContext";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const { cartItems, updateStatusCart } = useCart();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
    mode: "onChange",
  });

  const isFormValid = form.formState.isValid;

  const empty = !cartItems || cartItems.items.length === 0;

  const onSubmit = async (data: FormData) => {
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
    try {
      await updateStatusCart("completed");
      console.log(paymentData);
      setIsDialogOpen(true);
    } catch (error) {
      toast({
        title: "Error en el pago",
        description: `Ha ocurrido un error al procesar el pago. Por favor, inténtalo de nuevo. ${
          (error as Error).message
        }`,
        variant: "destructive",
      });
    }
  };

  const handleTabChange = (value: string) => {
    setActiveStep(value);
  };

  const handleNextStep = () => {
    if (activeStep === "personal") {
      setActiveStep("envio");
    } else if (activeStep === "envio") {
      setActiveStep("pago");
    }
  };

  const handlePreviousStep = () => {
    if (activeStep === "pago") {
      setActiveStep("envio");
    } else if (activeStep === "envio") {
      setActiveStep("personal");
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    router.push("/");
  };

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Proceso de Pago</CardTitle>
      </CardHeader>
      <CardContent>
        {empty ? (
          <EmptyForm />
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Tabs value={activeStep} onValueChange={handleTabChange}>
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
              <div className="flex justify-between">
                {activeStep !== "personal" && (
                  <Button type="button" onClick={handlePreviousStep}>
                    Anterior
                  </Button>
                )}
                {activeStep !== "pago" ? (
                  <Button
                    type="button"
                    onClick={handleNextStep}
                    className={activeStep === "personal" ? "ml-auto" : ""}
                  >
                    Siguiente
                  </Button>
                ) : (
                  <Button type="submit" disabled={!isFormValid}>
                    Realizar Pago
                  </Button>
                )}
              </div>
            </form>
          </Form>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Compra Confirmada</DialogTitle>
              <DialogDescription>
                <div className="flex flex-col items-center justify-center space-y-4">
                  <CheckCircle className="w-16 h-16 text-green-500" />
                  <p>Su compra ha sido confirmada exitosamente.</p>
                </div>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={handleDialogClose}>Volver al Inicio</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

const EmptyForm = () => {
  return (
    <div className="text-center p-4">
      <h2 className="text-xl font-semibold mb-2">Carrito Vacío</h2>
      <p className="mb-4">No puedes realizar un pago con el carrito vacío.</p>
      <Button asChild>
        <Link href="/products">Volver a la Tienda</Link>
      </Button>
    </div>
  );
};
