"use client";

import * as z from "zod";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Asterisk } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { registerUser } from "@/services/users";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

const numberRegex = /^\d+$/;

const formSchema = z
  .object({
    first_name: z.string({ message: "Is required" }),
    last_name: z.string({ message: "Is required" }),
    dni: z
      .string({ message: "DNI is required" })
      .min(7, { message: "DNI must be at least 7 characters" })
      .max(8, { message: "DNI must be at most 8 characters" })
      .regex(numberRegex, { message: "DNI must contain only numbers" }),
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
    email: z.string().email({ message: "Email is invalid" }),
    confirmEmail: z.string(),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Emails do not match",
    path: ["confirmEmail"],
  });

type FormData = z.infer<typeof formSchema>;

export default function RegistrationForm() {
  const [backendError, setBackendError] = useState<string | null>(null);
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      dni: "",
      number_phone: { areaCode: "", number: "" },
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    const newUserForm = {
      first_name: data.first_name,
      last_name: data.last_name,
      dni: data.dni,
      number_phone: data.number_phone.areaCode + data.number_phone.number,
      email: data.email,
      password: data.password,
    };
    try {
      await registerUser(newUserForm);
      router.push("login");
    } catch (error) {
      if (error instanceof Error) {
        setBackendError(error.message);
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md my-12"
      >
        {backendError && (
          <Alert variant="destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{backendError}</AlertDescription>
          </Alert>
        )}
        <h2 className="text-2xl font-bold mb-6 text-center">
          Registro de Usuario
        </h2>

        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-1">
                Nombre <Asterisk size={16} className="text-red-500" />
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
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-1">
                Apellido <Asterisk size={16} className="text-red-500" />
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
          name="dni"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-1">
                DNI <Asterisk size={16} className="text-red-500" />
              </FormLabel>
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
                  <Asterisk size={16} className="text-red-500" />
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
                  <Asterisk size={16} className="text-red-500" />
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
              <FormLabel className="flex gap-1">
                Correo electrónico{" "}
                <Asterisk size={16} className="text-red-500" />
              </FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-1">
                Confirmas correo electrónico{" "}
                <Asterisk size={16} className="text-red-500" />
              </FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-1">
                Contraseña
                <Asterisk size={16} className="text-red-500" />
              </FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-1">
                Confirmar <Asterisk size={16} className="text-red-500" />
              </FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={!form.formState.isValid}
        >
          Registrarse
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Do you already have an account?
          <Link
            href="login"
            className="mx-4 font-medium text-primary hover:underline"
            prefetch={false}
          >
            Login
          </Link>
        </p>
      </form>
    </Form>
  );
}
