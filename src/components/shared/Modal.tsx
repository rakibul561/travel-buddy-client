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
import { useUpdateUserMutation, useUserInfoQuery } from "@/redux/feature/auth/auth.api";
import { Camera, Edit3, Lock, Upload, User } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function UpdateProfile() {
  const [open, setOpen] = useState(false);
  const { refetch } = useUserInfoQuery(undefined);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
      toast.error("Nothing to update");
      return;
    }

    try {
      await updateUser(formData).unwrap();

      toast.success("Profile updated successfully 🎉");
      await refetch();
      form.reset();
      setPreviewImage(null);
      setOpen(false);
    } catch (error: any) {
      console.error("UPDATE PROFILE ERROR:", error);
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="btn-primary shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
          <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-0 rounded-3xl shadow-2xl bg-white/95 backdrop-blur-xl ring-1 ring-black/5">
        <div className="bg-gradient-to-r from-primary to-primary/80 px-8 py-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/5 rounded-full blur-2xl -ml-16 -mb-16"></div>

          <DialogHeader className="relative z-10">
            <DialogTitle className="text-3xl font-bold font-display tracking-tight">
              Edit Profile
            </DialogTitle>
            <DialogDescription className="text-primary-foreground/80 text-base">
              Update your personal information
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">
          {/* Image Upload */}
          <div className="flex justify-center -mt-12 mb-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-gray-50 flex items-center justify-center overflow-hidden">
                {previewImage ? (
                  <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-10 h-10 text-muted-foreground/50" />
                )}
              </div>
              <label className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg cursor-pointer hover:bg-primary/90 transition-colors border-2 border-white">
                <Camera size={14} />
                <input name="file" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </label>
            </div>
          </div>

          <div className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700">Full Name</Label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-primary transition-colors" />
                <Input
                  name="fullName"
                  placeholder="Enter your full name"
                  className="pl-9 h-11 bg-gray-50/50 border-gray-200 focus:bg-white transition-all rounded-xl"
                />
              </div>
            </div>

            {/* Password Section */}
            <div className="space-y-4 pt-4 border-t border-dashed border-gray-200">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                <Lock className="w-4 h-4" /> Security
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Current Password</Label>
                  <Input
                    name="oldPassword"
                    type="password"
                    placeholder="••••••••"
                    className="h-10 text-sm bg-gray-50/50 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">New Password</Label>
                  <Input
                    name="newPassword"
                    type="password"
                    placeholder="••••••••"
                    className="h-10 text-sm bg-gray-50/50 rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-3 pt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="h-11 rounded-xl border-gray-200 hover:bg-gray-50 hover:text-gray-900">
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" disabled={isLoading} className="btn-primary h-11 px-8 rounded-xl shadow-lg shadow-primary/20">
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </span>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
