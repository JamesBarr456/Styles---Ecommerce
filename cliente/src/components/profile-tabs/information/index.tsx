"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { useState } from "react";

export const ProfileContent = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    address: "123 Main St, City, Country",
    phone: "+1234567890",
    avatar: "/placeholder.svg",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const handleEditProfile = () => {
    setIsEditing(true);
    setEditedUser(user);
  };

  const handleSaveProfile = () => {
    setUser(editedUser);
    setIsEditing(false);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedUser((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Manage your profile details here.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={isEditing ? editedUser.avatar : user.avatar} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          {isEditing && (
            <div>
              <Input
                id="avatar"
                type="file"
                onChange={handleAvatarChange}
                className="sr-only"
              />
              <Label htmlFor="avatar" className="cursor-pointer">
                <Upload className="h-4 w-4 mr-2" />
                Change Avatar
              </Label>
            </div>
          )}
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={isEditing ? editedUser.name : user.name}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={isEditing ? editedUser.email : user.email}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              value={isEditing ? editedUser.address : user.address}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              value={isEditing ? editedUser.phone : user.phone}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {isEditing ? (
          <Button onClick={handleSaveProfile}>Save Changes</Button>
        ) : (
          <Button onClick={handleEditProfile}>Edit Profile</Button>
        )}
      </CardFooter>
    </Card>
  );
};
