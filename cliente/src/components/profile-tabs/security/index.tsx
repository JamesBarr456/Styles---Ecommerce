"use client";

import * as z from "zod";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
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
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import Loading from "@/components/others/loading";
import { putPasswordUser } from "@/services/users";
import { seguritySchema } from "@/schemas";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

export const SecurityContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [backendError, setBackendError] = useState<string | null>(null);
  const { updatePassword, user } = useAuth();

  const form = useForm<z.infer<typeof seguritySchema>>({
    resolver: zodResolver(seguritySchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof seguritySchema>) {
    setIsLoading(true);
    try {
      if (user) {
        const resp = await putPasswordUser(user._id, {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        });
        updatePassword(resp);
        toast({
          title: "Password updated",
          description: "Your password has been successfully changed.",
        });
        form.reset();
      }
      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setBackendError(error.message);
        setIsLoading(false);
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
        <CardDescription>Manage your account security here.</CardDescription>
      </CardHeader>
      <CardContent>
        {backendError && (
          <Alert variant="destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{backendError}</AlertDescription>
          </Alert>
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-5"
          >
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    Password must be at least 8 characters and include upper and
                    lowercase letters, a number and a special character.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" variant={"outline"} disabled={isLoading}>
              {isLoading ? <Loading /> : "Change Password"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
