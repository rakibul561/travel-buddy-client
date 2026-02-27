"use client";

import { Button } from "@/components/ui/button";
import { useCreateTravelMutation } from "@/redux/api";
import {
    Calendar,
    DollarSign,
    Loader2,
    MapPin,
    Upload,
    X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function CreateTravelPlan() {
    const router = useRouter();
    const [createTravel, { isLoading }] = useCreateTravelMutation();

    const [formData, setFormData] = useState({
        destination: "",
        country: "",
        city: "",
        startDate: "",
        endDate: "",
        budgetMin: "",
        budgetMax: "",
        travelType: "SOLO",
        description: "",
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImageFile(null);
        setImagePreview("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!imageFile) {
            toast.error("Please upload a destination image");
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("file", imageFile);

        const travelData = {
            destination: formData.destination,
            country: formData.country,
            city: formData.city,
            startDate: new Date(formData.startDate).toISOString(),
            endDate: new Date(formData.endDate).toISOString(),
            budgetMin: parseInt(formData.budgetMin),
            budgetMax: parseInt(formData.budgetMax),
            travelType: formData.travelType,
            description: formData.description,
        };

        formDataToSend.append("data", JSON.stringify(travelData));

        try {
            await createTravel(formDataToSend).unwrap();
            toast.success("Travel plan created successfully!");
            router.push("/explore-travelers");
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to create travel plan");
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 bg-[#FAFAF8]">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Create Travel Plan
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Share your upcoming adventure and find the perfect travel companion
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Image Upload */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            Destination Image
                        </h2>
                        <div className="space-y-4">
                            {imagePreview ? (
                                <div className="relative">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-64 object-cover rounded-xl"
                                    />
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                                    >
                                        <X className="w-5 h-5 text-gray-700" />
                                    </button>
                                </div>
                            ) : (
                                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-[#8B9D83] transition-colors bg-gray-50">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <Upload className="w-12 h-12 text-gray-400 mb-4" />
                                        <p className="mb-2 text-sm text-gray-600 font-medium">
                                            Click to upload destination image
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            PNG, JPG or WEBP (MAX. 5MB)
                                        </p>
                                    </div>
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </label>
                            )}
                        </div>
                    </div>
                    {/* Destination Details */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            Destination Details
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Destination Name
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        required
                                        value={formData.destination}
                                        onChange={(e) =>
                                            setFormData({ ...formData, destination: e.target.value })
                                        }
                                        placeholder="e.g., Bali Adventure"
                                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Country
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.country}
                                    onChange={(e) =>
                                        setFormData({ ...formData, country: e.target.value })
                                    }
                                    placeholder="e.g., Indonesia"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    City
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.city}
                                    onChange={(e) =>
                                        setFormData({ ...formData, city: e.target.value })
                                    }
                                    placeholder="e.g., Ubud"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Travel Type
                                </label>
                                <select
                                    value={formData.travelType}
                                    onChange={(e) =>
                                        setFormData({ ...formData, travelType: e.target.value })
                                    }
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent bg-white"
                                >
                                    <option value="SOLO">Solo</option>
                                    <option value="COUPLE">Couple</option>
                                    <option value="FAMILY">Family</option>
                                    <option value="FRIENDS">Friends</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Travel Dates */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            Travel Dates
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Start Date
                                </label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="date"
                                        required
                                        value={formData.startDate}
                                        onChange={(e) =>
                                            setFormData({ ...formData, startDate: e.target.value })
                                        }
                                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    End Date
                                </label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="date"
                                        required
                                        value={formData.endDate}
                                        onChange={(e) =>
                                            setFormData({ ...formData, endDate: e.target.value })
                                        }
                                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Budget */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Budget</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Minimum Budget (USD)
                                </label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        value={formData.budgetMin}
                                        onChange={(e) =>
                                            setFormData({ ...formData, budgetMin: e.target.value })
                                        }
                                        placeholder="1000"
                                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Maximum Budget (USD)
                                </label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        value={formData.budgetMax}
                                        onChange={(e) =>
                                            setFormData({ ...formData, budgetMax: e.target.value })
                                        }
                                        placeholder="1500"
                                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            Description
                        </h2>
                        <textarea
                            required
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                            }
                            placeholder="Describe your travel plans, what you're looking for in a travel companion, and any other relevant details..."
                            rows={6}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent resize-none"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.back()}
                            className="flex-1 py-6 text-lg rounded-xl border-2"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 py-6 text-lg rounded-xl bg-[#8B9D83] hover:bg-[#7A8C73] text-white"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                    Creating...
                                </>
                            ) : (
                                "Create Travel Plan"
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
