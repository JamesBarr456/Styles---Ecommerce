"use client";

import * as z from "zod";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { IUser } from "@/interfaces/users";
import { Input } from "@/components/ui/input";
import Loading from "@/components/others/loading";
import { ProfileSkeleton } from "@/components/skeletons/profile-skeleton";
import { profileSchema } from "@/schemas";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

export const ProfileContent = () => {
  const { user, update } = useAuth();

  if (!user) return <ProfileSkeleton />;
  return (
    <>
      <ProfileForm dataUser={user} update={update} />
    </>
  );
};
interface Props {
  dataUser: IUser;
  update: (userId: string, dataUser: Partial<IUser>) => void;
}

const ProfileForm = ({ dataUser, update }: Props) => {
  const [loadingChange, setLoadingChange] = useState(false);
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: dataUser.first_name || "",
      last_name: dataUser.last_name || "",
      dni: dataUser.dni || "",
      email: dataUser.email || "",
      number_phone: dataUser.number_phone || "",
      avatar: dataUser.avatar || "",
    },
  });

  const onSubmit = (values: z.infer<typeof profileSchema>) => {
    try {
      setLoadingChange(true);

      setTimeout(async () => {
        await update(dataUser._id, values);
        setLoadingChange(false);
        toast({
          title: "Profile updated",
          description: "Your profile has been successfully updated.",
        });
      }, 2000);
    } catch (error) {
      if (error instanceof Error) {
        setLoadingChange(false);
        toast({
          title: "Error",
          description: `There was an error updating your profile. message: ${error.message}`,
          variant: "destructive",
        });
      }
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Manage your profile details here.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form
          onSubmit={(e) => {
            form.handleSubmit(onSubmit)(e);
          }}
        >
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={form.watch("avatar")} />
                <AvatarFallback>{dataUser.first_name[0]}</AvatarFallback>
              </Avatar>
            </div>
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/avatar.jpg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="dni"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DNI</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="number_phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefóno</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              variant={"outline"}
              disabled={loadingChange || !form.formState.isDirty}
              type="submit"
            >
              {loadingChange ? <Loading /> : "Save Changes"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
