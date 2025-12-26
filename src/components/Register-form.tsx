/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef } from "react";
import {
  Camera,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Globe,
} from "lucide-react";
import { registerUser } from "@/services/auth/registerUser";

const RegisterForm = () => {
 
  const formRef = useRef<HTMLFormElement>(null);

  const [isPending, setIsPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [state, setState] = useState<any>(null);

  // 🔹 image preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // 🔹 submit handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setState(null); 

    try {
      const formData = new FormData(e.currentTarget);
      const result = await registerUser(null, formData);

     

      if (result?.success) {
     
        formRef.current?.reset();
        setPreviewImage(null);
        setState(null);
      } else {
        setState(result);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setState({
        success: false,
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-2xl">👋</span>
            </div>
            <h1 className="text-3xl font-bold">
              Hello
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500">
                Travel
              </span>
            </h1>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Join 50,000+ happy travelers
          </h2>
          <p className="text-gray-600">
            Start your adventure with friends! 🌍
          </p>
        </div>

        {/* Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
        >
          <div className="space-y-5">
            {/* Profile Picture */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-pink-100 to-blue-100 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12 text-gray-400" />
                  )}
                </div>

                <label className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center text-white cursor-pointer">
                  <Camera className="w-5 h-5" />
                  <input
                    name="file"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                    required
                  />
                </label>
              </div>
            </div>

            {/* Username */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                name="name"
                placeholder="Username"
                required
                className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 outline-none"
              />
            </div>

            {/* Full Name */}
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                name="fullName"
                placeholder="Full Name"
                required
                className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 outline-none"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                name="email"
                type="email"
                placeholder="Email"
                required
                className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 outline-none"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                required
                className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((p) => !p)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold disabled:opacity-50"
            >
              {isPending ? "Creating..." : "Create Account"}
            </button>

            {/* Messages */}
            {state?.success === false && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center text-red-600 text-sm">
                {state.message}
              </div>
            )}

            {state?.success && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center text-green-600 text-sm">
                Account created successfully 🎉
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
