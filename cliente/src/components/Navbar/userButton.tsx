"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CircleUserRound,
  LogOut,
  UserCircle,
  UserRoundCheck,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export function UserButton() {
  const { logout, user, isAuthenticated } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = () => {
    logout();
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-10 p-2 rounded-full hover:bg-orange-50 hover:text-orange-500"
        >
          {isAuthenticated && user ? ( // Verifica si el usuario está autenticado y si existe
            user.avatar && user.avatar.trim() !== "" ? ( // Verifica si el avatar no es un string vacío
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar} alt={user.first_name} />
                <AvatarFallback>{user.first_name}</AvatarFallback>
              </Avatar>
            ) : (
              <UserRoundCheck /> // Muestra el icono de Lucide si el avatar está vacío
            )
          ) : (
            <CircleUserRound /> // Muestra este icono si no hay usuario autenticado
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end" forceMount>
        {isAuthenticated ? (
          <>
            <DropdownMenuItem asChild>
              <Link href="/profile" className="flex items-center">
                <UserCircle className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleSignOut}
              className="flex items-center text-red-600"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem asChild>
            <Link href="/auth/login" className="flex items-center">
              <span>Iniciar sesión</span>
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
