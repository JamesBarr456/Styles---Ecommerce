"use client";

import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { registerUser } from "@/app/api/auth/route";
import { useState } from "react";

// import { useRouter } from "next/navigation";

interface FormValues {
  first_name: string;
  last_name: string;
  dni: string;
  number_phone: string;
  email: string;
  password: string;
  confirm_password?: string;
}
export default function Register() {
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm<FormValues>();

  // // const router = useRouter();

  // const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // const password = watch("password");
  // const onSubmit: SubmitHandler<FormValues> = async (data) => {
  //   try {
  //     const formData = { ...data };

  //     delete formData.confirm_password;

  //     const response = await registerUser(formData);
  //     console.log(response);
  //     // router.push("/login")
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       setErrorMessage(error.message);
  //     } else {
  //       setErrorMessage("An unexpected error occurred. Please try again.");
  //     }
  //   }
  // };

  return (
    // <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
    //   {errorMessage && (
    //     <div className="mb-4 p-2 text-sm text-red-500 bg-red-100 rounded">
    //       {errorMessage}
    //     </div>
    //   )}
    //   <div>
    //     <p>Datos Personales</p>
    //     <div className="relative">
    //       <Label htmlFor="firstName">First Name</Label>
    //       <Input
    //         {...register("first_name", {
    //           required: "Can't be empty",
    //         })}
    //         type="text"
    //         name="first_name"
    //       />
    //       {errors.first_name && (
    //         <p className="absolute top-6 right-0  text-sm text-red-500 font-bold ">
    //           {errors.first_name.message}
    //         </p>
    //       )}
    //     </div>

    //     <div className="relative">
    //       <Label htmlFor="lastName">Last Name</Label>
    //       <Input
    //         {...register("last_name", { required: "Can't be empty" })}
    //         type="text"
    //         name="last_name"
    //       />
    //       {errors.last_name && (
    //         <p className="absolute top-6 right-0  text-sm text-red-500 font-bold ">
    //           {errors.last_name.message}
    //         </p>
    //       )}
    //     </div>

    //     <div className="relative">
    //       <Label htmlFor="dni">DNI</Label>
    //       <Input
    //         {...register("dni", { required: "Can't be empty" })}
    //         type="text"
    //         name="dni"
    //       />
    //       {errors.dni && (
    //         <p className="absolute top-6 right-0  text-sm text-red-500 font-bold ">
    //           {errors.dni.message}
    //         </p>
    //       )}
    //     </div>

    //     <div className="relative">
    //       <Label htmlFor="numeroContacto">Número de cContacto</Label>
    //       <Input
    //         {...register("number_phone")}
    //         type="text"
    //         name="number_phone"
    //       />
    //       {errors.number_phone && (
    //         <p className="absolute top-6 right-0  text-sm text-red-500 font-bold ">
    //           {errors.number_phone.message}
    //         </p>
    //       )}
    //     </div>
    //   </div>

    //   <div>
    //     <p>Sobre tu cuenta</p>
    //     <div className="relative">
    //       <Label htmlFor="email">Email</Label>
    //       <Input
    //         {...register("email", {
    //           required: "Can't be empty",
    //           pattern: {
    //             value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    //             message: "Invalid email",
    //           },
    //         })}
    //         type="email"
    //         name="email"
    //       />
    //       {errors.email && (
    //         <p className="absolute top-6 right-0  text-sm text-red-500 font-bold ">
    //           {errors.email.message}
    //         </p>
    //       )}
    //     </div>

    //     <div className="relative">
    //       <Label htmlFor="password">Password</Label>
    //       <Input
    //         {...register("password", {
    //           required: "Can't be empty",
    //           minLength: {
    //             value: 8,
    //             message: "Password short",
    //           },
    //           pattern: {
    //             value: /^(?=.*[A-Za-z])(?=.*\d).+$/,
    //             message: "Password Invalid",
    //           },
    //         })}
    //         type="password"
    //       />
    //       <span>minimo 8 caracteres, con al menos una letra y un numero</span>
    //       {errors.password && (
    //         <p className="absolute top-6 right-0  text-sm text-red-500 font-bold ">
    //           {errors.password.message}
    //         </p>
    //       )}
    //     </div>

    //     <div className="relative">
    //       <Label htmlFor="confirmPassword">Confirmar Password</Label>
    //       <Input
    //         {...register("confirm_password", {
    //           required: {
    //             value: true,
    //             message: "Can't be empty",
    //           },
    //           validate: (value) =>
    //             value === password || "The passwords don't match",
    //         })}
    //         type="password"
    //         name="confirm_password"
    //       />

    //       {errors.confirm_password && (
    //         <p className="absolute top-6 right-0  text-sm text-red-500 font-bold ">
    //           {errors.confirm_password.message}
    //         </p>
    //       )}
    //     </div>
    //   </div>

    //   <div className="flex flex-col gap-2">
    //     <Button type="submit" className="bg-orange text-white uppercase">
    //       Completar registro
    //     </Button>
    //   </div>
    // </form>
    <div className="flex flex-col items-center justify-center bg-[url('/subtle-pattern.svg')] bg-repeat bg-[length:100px_100px] my-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md rounded-lg bg-background p-8">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Registrarme</h1>
          </div>
          <form className="space-y-4">
            <p>Datos Personales</p>
            <div>
              <Label htmlFor="nombre">Nombre</Label>
              <Input id="nombre" type="text" placeholder="* Nombre" required />
            </div>
            <div>
              <Label htmlFor="apellido">Apellido</Label>
              <Input
                id="apellido"
                type="text"
                placeholder="* Apellido"
                required
              />
            </div>
            <div>
              <Label htmlFor="dni">DNI</Label>
              <Input id="dni" type="text" placeholder="* Número" required />
            </div>
            <div>
              <Label htmlFor="dni">Télefono (cod. área + número)</Label>
              <Input id="dni" type="text" placeholder="* Número" required />
            </div>
            <p>Sobre tu Cuenta</p>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="* Email" required />
            </div>
            <div>
              <Label htmlFor="contraseña">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="* Contraseña"
                required
              />
            </div>
            <div>
              <Label htmlFor="confirmContraseña">Confirmar Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="* Confirmar Contraseña"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Registrarme
            </Button>
          </form>
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
        </div>
      </div>
    </div>
  );
}
