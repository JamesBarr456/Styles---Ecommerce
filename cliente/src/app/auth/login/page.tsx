import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center bg-[url('/subtle-pattern.svg')] bg-repeat bg-[length:100px_100px] my-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md rounded-lg bg-background p-8">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Iniciar Sesión</h1>
          </div>
          <form className="space-y-4">
            <div>
              <Label htmlFor="Email">Email</Label>
              <Input id="Email" type="email" placeholder="* Email" required />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="text-sm font-medium text-primary hover:underline"
                  prefetch={false}
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="* Contraseña"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Log in
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="register"
              className="font-medium text-primary hover:underline"
              prefetch={false}
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
