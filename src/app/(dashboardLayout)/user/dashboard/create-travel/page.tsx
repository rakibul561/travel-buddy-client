/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreateTravelMutation } from "@/redux/feature/travel/travel.api";
import {
  Calendar,
  DollarSign,
  Image as ImageIcon,
  MapPin,
  Plane,
  Info
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CreateTravelPage() {
  const [createTravel, { isLoading }] = useCreateTravelMutation();
  const router = useRouter();
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
    const formData = new FormData(form);

    const travelData = {
      destination: formData.get("destination"),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
      budget: Number(formData.get("budget")),
      travelType: formData.get("travelType"),
      description: formData.get("description"),
    };

    const submitData = new FormData();
    const file = formData.get("file");
    if (file) submitData.append("file", file);
    submitData.append("data", JSON.stringify(travelData));

    try {
      await createTravel(submitData).unwrap();
      toast.success("Travel plan created successfully! ✈️");
      router.push("/user/dashboard/my-travels");
    } catch (error: any) {
      console.error(error);
      toast.error(error?.data?.message || "Failed to create travel plan");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
          Plan Your Next <span className="text-blue-600">Adventure</span>
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Share your travel plans, outline your budget, and find the perfect travel buddy to join your journey.
        </p>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
        {/* Subtle top gradient bar */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

        <form onSubmit={handleSubmit} className="p-8 sm:p-10 space-y-10 relative z-10">

          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">

            {/* Destination */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <MapPin size={18} className="text-blue-500" /> Destination
              </Label>
              <Input
                name="destination"
                placeholder="Where are you going? (e.g. Paris, France)"
                required
                className="h-14 rounded-xl bg-slate-50/50 border-slate-200 text-base focus:bg-white transition-colors"
              />
            </div>

            {/* Travel Type */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Plane size={18} className="text-blue-500" /> Travel Type
              </Label>
              <Select name="travelType" required>
                <SelectTrigger className="h-14 rounded-xl bg-slate-50/50 border-slate-200 text-base focus:bg-white transition-colors">
                  <SelectValue placeholder="Select travel type" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                  <SelectItem value="Adventure" className="cursor-pointer">Adventure</SelectItem>
                  <SelectItem value="Leisure" className="cursor-pointer">Leisure</SelectItem>
                  <SelectItem value="Business" className="cursor-pointer">Business</SelectItem>
                  <SelectItem value="Backpacking" className="cursor-pointer">Backpacking</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Start Date */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Calendar size={18} className="text-blue-500" /> Start Date
              </Label>
              <Input
                name="startDate"
                type="date"
                required
                className="h-14 rounded-xl bg-slate-50/50 border-slate-200 text-base focus:bg-white px-4 cursor-pointer"
              />
            </div>

            {/* End Date */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Calendar size={18} className="text-blue-500" /> End Date
              </Label>
              <Input
                name="endDate"
                type="date"
                required
                className="h-14 rounded-xl bg-slate-50/50 border-slate-200 text-base focus:bg-white px-4 cursor-pointer"
              />
            </div>

            {/* Budget */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <DollarSign size={18} className="text-blue-500" /> Estimated Budget
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-slate-500 font-medium">$</span>
                </div>
                <Input
                  name="budget"
                  type="number"
                  placeholder="1500"
                  required
                  min="0"
                  className="h-14 rounded-xl bg-slate-50/50 border-slate-200 pl-8 text-base focus:bg-white"
                />
              </div>
            </div>

            {/* Cover Image Upload */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <ImageIcon size={18} className="text-blue-500" /> Cover Image
              </Label>

              <div className="relative group">
                <Input
                  name="file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="h-14 max-w-full rounded-xl bg-slate-50/50 border border-dashed border-slate-300 file:bg-blue-50 file:text-blue-600 file:border-0 file:rounded-lg file:mr-4 file:px-4 file:py-2 file:text-sm file:font-semibold hover:file:bg-blue-100 transition-all pt-2.5 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <Label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Info size={18} className="text-blue-500" /> Trip Description
            </Label>
            <Textarea
              name="description"
              placeholder="Describe your travel plan, what you want to do, places to visit, and what kind of buddy you are looking for..."
              required
              className="min-h-[160px] rounded-xl bg-slate-50/50 border-slate-200 text-base focus:bg-white p-4 resize-none leading-relaxed"
            />
          </div>

          {/* Image Preview Area */}
          {previewImage && (
            <div className="space-y-3 animate-in fade-in zoom-in-95 duration-300">
              <Label className="text-sm font-semibold text-slate-700">Image Preview</Label>
              <div className="relative h-64 w-full rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-slate-100">
                <img
                  src={previewImage}
                  alt="Destination Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Submit Action */}
          <div className="pt-6">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:pointer-events-none"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating Your Plan...
                </div>
              ) : (
                "Publish Travel Plan"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
