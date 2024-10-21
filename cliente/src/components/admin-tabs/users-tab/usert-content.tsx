"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Trash2, UserCog, UserX } from "lucide-react";
import { deleteUser, getUsers, putUser } from "@/services/users";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { IUser } from "@/interfaces/users";
import Loading from "@/components/others/loading";
import { ScrollArea } from "@/components/ui/scroll-area";

export const UserContent = () => {
  const [users, setUsers] = useState<IUser[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getUsersApi = async () => {
      setLoading(true);
      try {
        const response = await getUsers();
        setUsers(response);
      } catch (error) {
        throw new Error((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    getUsersApi();
  }, []);

  if (loading)
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loading />
      </div>
    );

  if (!users) throw new Error("users not found");

  const handleDeleteUser = async (id: string) => {
    const resp: IUser = await deleteUser(id);
    setUsers(
      (prevState) =>
        prevState && {
          ...prevState,
          products: prevState.filter((user) => user._id !== resp._id),
        }
    );
  };

  const handleUserRole = async (user: IUser) => {
    const newRole = user.status === "user" ? "admin" : "user";
    const updatedUser = await putUser(user._id, { status: newRole });
    setUsers((prevUsers) =>
      prevUsers
        ? prevUsers.map((u) =>
            u._id === updatedUser._id ? { ...u, status: newRole } : u
          )
        : null
    );
  };

  return (
    <ScrollArea className="h-[400px] w-full rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>DNI</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.first_name}</TableCell>
              <TableCell>{user.last_name}</TableCell>
              <TableCell>{user.dni}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>active</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => handleUserRole(user)}
                          variant="outline"
                          size="icon"
                        >
                          <UserCog className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Update Role</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon">
                          <UserX className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Bloquear User</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteUser(user._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete User</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};
