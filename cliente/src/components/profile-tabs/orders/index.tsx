"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

export const OrdersContent = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      date: "2023-05-15",
      total: 99.99,
      status: "Delivered",
      items: [
        { name: "Product 1", image: "/placeholder.svg", quantity: 2 },
        { name: "Product 2", image: "/placeholder.svg", quantity: 1 },
      ],
    },
    {
      id: 2,
      date: "2023-06-01",
      total: 149.99,
      status: "Shipped",
      items: [
        { name: "Product 3", image: "/placeholder.svg", quantity: 1 },
        { name: "Product 4", image: "/placeholder.svg", quantity: 3 },
      ],
    },
  ]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
        <CardDescription>
          View your past orders and their status.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {order.items.map((item, index) => (
                      <Image
                        key={index}
                        src={item.image}
                        alt={item.name}
                        width={30}
                        height={30}
                        className="rounded"
                      />
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
