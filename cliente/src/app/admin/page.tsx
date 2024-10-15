import { Package, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ProductContent } from "@/components/components_admin/products/product-content";
import { UserContent } from "@/components/components_admin/users/usert-content";

export default function Admin() {
  return (
    <div className="container  mx-auto p-4 ">
      <Tabs defaultValue="products">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="products">
            <Package className="mr-2 h-4 w-4" />
            Products
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="mr-2 h-4 w-4" />
            Users
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="mt-10 space-y-5">
          <ProductContent />
        </TabsContent>

        <TabsContent value="users" className="mt-10">
          <UserContent />
        </TabsContent>
      </Tabs>
    </div>
  );
}
