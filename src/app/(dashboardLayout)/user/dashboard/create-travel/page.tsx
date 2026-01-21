"use client";

import { useCreateTravelMutation } from "@/redux/feature/travel/travel.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Image as ImageIcon, MapPin, DollarSign, Plane } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold font-display text-primary">Plan Your Next Adventure</h1>
        <p className="text-muted-foreground">Share your travel plans and find the perfect buddy</p>
      </div>

      <div className="glass p-8 rounded-3xl border border-white/20 shadow-xl relative overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Destination */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 font-medium">
                <MapPin size={16} className="text-primary" /> Destination
              </Label>
              <Input
                name="destination"
                placeholder="e.g. Paris, France"
                required
                className="h-12 rounded-xl bg-white/50 border-gray-200 focus:border-primary focus:ring-primary/20"
              />
            </div>

            {/* Travel Type */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 font-medium">
                <Plane size={16} className="text-primary" /> Travel Type
              </Label>
              <Select name="travelType" required>
                <SelectTrigger className="h-12 rounded-xl bg-white/50 border-gray-200">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Adventure">Adventure</SelectItem>
                  <SelectItem value="Leisure">Leisure</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="Backpacking">Backpacking</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Dates */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 font-medium">
                <Calendar size={16} className="text-primary" /> Start Date
              </Label>
              <Input
                name="startDate"
                type="date"
                required
                className="h-12 rounded-xl bg-white/50 border-gray-200"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 font-medium">
                <Calendar size={16} className="text-primary" /> End Date
              </Label>
              <Input
                name="endDate"
                type="date"
                required
                className="h-12 rounded-xl bg-white/50 border-gray-200"
              />
            </div>

            {/* Budget */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 font-medium">
                <DollarSign size={16} className="text-primary" /> Budget ($)
              </Label>
              <Input
                name="budget"
                type="number"
                placeholder="e.g. 1500"
                required
                className="h-12 rounded-xl bg-white/50 border-gray-200"
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 font-medium">
                <ImageIcon size={16} className="text-primary" /> Cover Image
              </Label>
              <Input
                name="file"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="h-12 rounded-xl bg-white/50 border-gray-200 file:bg-primary/10 file:text-primary file:border-0 file:rounded-lg file:mr-4 file:px-4 file:py-2 hover:file:bg-primary/20"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 font-medium">Description</Label>
            <Textarea
              name="description"
              placeholder="Tell others about your trip plan..."
              required
              className="min-h-[120px] rounded-xl bg-white/50 border-gray-200 focus:border-primary focus:ring-primary/20"
            />
          </div>

          {/* Image Preview */}
          {previewImage && (
            <div className="relative h-48 w-full rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 text-lg font-bold btn-primary shadow-lg shadow-primary/20 rounded-xl"
          >
            {isLoading ? "Creating Plan..." : "Create Travel Plan"}
          </Button>
        </form>
      </div>
    </div>
  );
}
