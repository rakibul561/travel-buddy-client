"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  Calendar,
  DollarSign,
  FileText,
  Image as ImageIcon,
  MapPin,
  Users,
  X
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useCreateTravelMutation } from "../../../../../redux/feature/travel/travel.api";

export default function CreateTravelPage() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const [createTravel] = useCreateTravelMutation();

  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    destination: "",
    country: "",
    city: "",
    startDate: "",
    endDate: "",
    budgetMin: "",
    budgetMax: "",
    travelType: "",
    description: "",
  });

  // ---------------- handlers ----------------
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      travelType: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setPreviewImage(null);
    setSelectedFile(null);
    if (formRef.current) {
      const fileInput = formRef.current.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    }
  };

  // ---------------- submit ----------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("FORM STATE:", formData);
    console.log("FILE:", selectedFile);

    if (!selectedFile) {
      toast.error("Please select an image");
      return;
    }

    if (!formData.travelType) {
      toast.error("Select travel type");
      return;
    }

    try {
      setLoading(true);

      const formDataToSend = new FormData();

      formDataToSend.append("file", selectedFile);
      formDataToSend.append(
        "data",
        JSON.stringify({
          destination: formData.destination,
          country: formData.country,
          city: formData.city,
          startDate: formData.startDate,
          endDate: formData.endDate,
          budgetMin: Number(formData.budgetMin),
          budgetMax: Number(formData.budgetMax),
          travelType: formData.travelType,
          description: formData.description,
        })
      );

      // 🔍 debug FormData
      for (const pair of formDataToSend.entries()) {
        console.log(pair[0], pair[1]);
      }

      const res = await createTravel(formDataToSend).unwrap();
      console.log("API RESPONSE:", res);

      toast.success("Travel plan created successfully 🚀");
      router.push("/travels");
    } catch (error) {
      console.error("CREATE TRAVEL ERROR:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg animate-pulse">
              ✈️ Travel Planner
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Create Your Journey
          </h1>
          <p className="text-xl text-gray-600">
            Plan your next adventure with us
          </p>
        </div>

        <Card className="shadow-2xl border-0 backdrop-blur-sm bg-white/80 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-8">
            <CardTitle className="text-3xl flex items-center gap-3">
              <MapPin className="w-8 h-8" />
              Travel Plan Details
            </CardTitle>
            <CardDescription className="text-blue-50 text-base mt-2">
              Fill in the information below to create your travel plan
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              {/* Destination Section */}
              <div className="space-y-4 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-100 hover:border-blue-300 transition-all">
                <div className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-4">
                  <MapPin className="w-6 h-6 text-blue-600" />
                  <span>Destination</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-semibold text-gray-700">Destination Name</Label>
                    <Input
                      name="destination"
                      value={formData.destination}
                      onChange={handleInputChange}
                      required
                      className="mt-2 border-2 border-blue-200 focus:border-blue-500 transition-colors"
                      placeholder="e.g., Eiffel Tower"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      name="country"
                      placeholder="Country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="border-2 border-blue-200 focus:border-blue-500 transition-colors"
                    />
                    <Input
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="border-2 border-blue-200 focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Dates Section */}
              <div className="space-y-4 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-100 hover:border-purple-300 transition-all">
                <div className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-4">
                  <Calendar className="w-6 h-6 text-purple-600" />
                  <span>Travel Dates</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-semibold text-gray-700">Start Date</Label>
                    <Input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="mt-2 border-2 border-purple-200 focus:border-purple-500 transition-colors"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-gray-700">End Date</Label>
                    <Input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className="mt-2 border-2 border-purple-200 focus:border-purple-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Budget Section */}
              <div className="space-y-4 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-100 hover:border-green-300 transition-all">
                <div className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-4">
                  <DollarSign className="w-6 h-6 text-green-600" />
                  <span>Budget Range</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-semibold text-gray-700">Minimum Budget</Label>
                    <Input
                      type="number"
                      name="budgetMin"
                      placeholder="Min Budget"
                      value={formData.budgetMin}
                      onChange={handleInputChange}
                      className="mt-2 border-2 border-green-200 focus:border-green-500 transition-colors"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-gray-700">Maximum Budget</Label>
                    <Input
                      type="number"
                      name="budgetMax"
                      placeholder="Max Budget"
                      value={formData.budgetMax}
                      onChange={handleInputChange}
                      className="mt-2 border-2 border-green-200 focus:border-green-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Travel Type Section */}
              <div className="space-y-4 p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border-2 border-orange-100 hover:border-orange-300 transition-all">
                <div className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-4">
                  <Users className="w-6 h-6 text-orange-600" />
                  <span>Travel Type</span>
                </div>

                <Select
                  value={formData.travelType}
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger className="border-2 border-orange-200 focus:border-orange-500 transition-colors">
                    <SelectValue placeholder="Select travel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SOLO">🧳 Solo</SelectItem>
                    <SelectItem value="FRIENDS">👥 Friends</SelectItem>
                    <SelectItem value="FAMILY">👨‍👩‍👧‍👦 Family</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Description Section */}
              <div className="space-y-4 p-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl border-2 border-pink-100 hover:border-pink-300 transition-all">
                <div className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-4">
                  <FileText className="w-6 h-6 text-pink-600" />
                  <span>Description</span>
                </div>

                <Textarea
                  name="description"
                  placeholder="Describe your travel plans..."
                  value={formData.description}
                  onChange={handleInputChange}
                  className="border-2 border-pink-200 focus:border-pink-500 transition-colors min-h-[120px]"
                />
              </div>

              {/* Image Upload Section */}
              <div className="space-y-4 p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl border-2 border-indigo-100 hover:border-indigo-300 transition-all">
                <div className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-4">
                  <ImageIcon className="w-6 h-6 text-indigo-600" />
                  <span>Travel Image</span>
                </div>

                <div className="space-y-4">
                  <Label
                    htmlFor="file-upload"
                    className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-indigo-300 border-dashed rounded-xl appearance-none cursor-pointer hover:border-indigo-400 focus:outline-none"
                  >
                    <span className="flex items-center space-x-2">
                      <ImageIcon className="w-6 h-6 text-indigo-600" />
                      <span className="font-medium text-indigo-600">
                        Click to upload image
                      </span>
                    </span>
                    <Input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </Label>

                  {previewImage && (
                    <div className="relative group">
                      <img
                        src={previewImage}
                        alt="preview"
                        className="w-full h-64 object-cover rounded-xl shadow-lg"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transform transition-transform hover:scale-110"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-14 text-lg font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating...
                  </span>
                ) : (
                  "🚀 Create Travel Plan"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
