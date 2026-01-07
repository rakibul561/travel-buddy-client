/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateUserMutation, useUserInfoQuery } from "@/redux/feature/auth/auth.api"; // ✅ Add useUserInfoQuery
import { Camera, Sparkles, User } from "lucide-react";
import { useState } from "react"; // ✅ Add useState
import toast from "react-hot-toast";

export default function UpdateProfile() {
  const [open, setOpen] = useState(false); // ✅ Control dialog state
  const { refetch } = useUserInfoQuery(undefined); // ✅ Add refetch
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  console.log( "the update user is", updateUser)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const rawFormData = new FormData(form);
    const formData = new FormData();

    // ---------------- FULL NAME ----------------
    const fullName = rawFormData.get("fullName");
    if (fullName && fullName.toString().trim()) {
      formData.append("fullName", fullName.toString().trim());
    }

    // ---------------- PASSWORD ----------------
    const oldPassword = rawFormData.get("oldPassword");
    const newPassword = rawFormData.get("newPassword");

    if (oldPassword && newPassword) {
      formData.append("oldPassword", oldPassword.toString());
      formData.append("newPassword", newPassword.toString());
    }

    // ---------------- FILE ----------------
    const file = rawFormData.get("file") as File;
    if (file && file.size > 0) {
      formData.append("file", file);
    }

    // ❌ Prevent empty submit
    if ([...formData.entries()].length === 0) {
      toast.error("❌ Nothing to update");
      console.warn("⚠️ Empty FormData – request cancelled");
      return;
    }

    // 🔍 DEBUG: Sending data
    console.group("📤 UPDATE PROFILE REQUEST");
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
    console.groupEnd();

    try {
      const response = await updateUser(formData).unwrap();

      // 🔍 DEBUG: Response inspection
      console.group("✅ UPDATE PROFILE RESPONSE");
      console.log("Full response:", response);
      console.log("Updated name:", response?.data?.fullName);
      console.log("Updated image:", response?.data?.profilePicture);
      console.log("Updated at:", response?.data?.updatedAt);
      console.groupEnd();

      toast.success("✅ Profile updated successfully");

      // ✅ Refetch user data to update UI
      await refetch();

      form.reset();
      setOpen(false); // ✅ Close dialog after success
    } catch (error: any) {
      console.error("❌ UPDATE PROFILE ERROR:", error);
      toast.error(error?.data?.message || "❌ Failed to update profile");
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <Dialog open={open} onOpenChange={setOpen}> {/* ✅ Control dialog */}
        <DialogTrigger asChild>
          <Button className="bg-[#00DC33] hover:bg-[#00C32D] text-white px-8 py-6 rounded-2xl">
            <Sparkles className="mr-2" /> Update Profile
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[550px] p-0 rounded-3xl">
          <div className="bg-[#00DC33] px-8 py-8 text-white">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold">
                Edit Profile
              </DialogTitle>
              <DialogDescription className="text-white/90">
                Update your personal info
              </DialogDescription>
            </DialogHeader>
          </div>

          <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">
            {/* Full Name */}
            <div>
              <Label className="flex items-center gap-2">
                <User size={16} /> Full Name
              </Label>
              <Input name="fullName" placeholder="Enter your full name" />
            </div>

            {/* Image */}
            <div>
              <Label className="flex items-center gap-2">
                <Camera size={16} /> Profile Picture
              </Label>
              <Input name="file" type="file" accept="image/*" />
            </div>

            {/* Password */}
            <div className="pt-4 border-t text-sm text-gray-500 text-center">
              🔐 Security
            </div>

            <Input name="oldPassword" type="password" placeholder="Old password" />
            <Input name="newPassword" type="password" placeholder="New password" />

            <DialogFooter className="gap-3">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>

              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
