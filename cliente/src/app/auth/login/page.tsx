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
import { loginUser } from "@/services/users";
import { useAuth } from "@/context/AuthContext";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Email is invalid" }),
  password: z
    .string({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});

type FormData = z.infer<typeof formSchema>;

export default function RegistrationForm() {
  const [backendError, setBackendError] = useState<string | null>(null);

  const { login } = useAuth();

  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await loginUser(data);
      login(res.token, res.data);
      router.push("/");
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
          Inicio de Sesión
        </h2>

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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-1">
                Contraseña <Asterisk size={16} className="text-red-500" />
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
          Log in
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Don&apos; have an account?
          <Link
            href="register"
            className="mx-4 font-medium text-primary hover:underline"
            prefetch={false}
          >
            Register
          </Link>
        </p>
      </form>
    </Form>
  );
}
