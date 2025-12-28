/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";


import {
  Camera,
  Eye,
  EyeOff,
  Globe,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useRegisterMutation } from "../redux/feature/auth/auth.api";

const RegisterForm = () => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [state, setState] = useState<any>(null);

  const [register, { isLoading }] = useRegisterMutation();

  // 🔹 Image preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // 🔹 Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setState(null);

  try {
    const form = e.currentTarget;
    const rawFormData = new FormData(form);

    const file = rawFormData.get("file");

    const data = {
      name: rawFormData.get("name"),
      fullName: rawFormData.get("fullName"),
      email: rawFormData.get("email"),
      password: rawFormData.get("password"),
      role: "USER",
    };

    const formData = new FormData();
    if (file) {
      formData.append("file", file as File);
    }
    formData.append("data", JSON.stringify(data));

    const res = await register(formData).unwrap();
    console.log("REGISTER RESPONSE:", res);

    toast.success("Registration successful 🎉");
    formRef.current?.reset();
    setPreviewImage(null);
    router.push("/login");

  } catch (error: any) {
    console.error("Register error:", error);

    const message =
      error?.data?.message || "Registration failed";

    toast.error(message);
    setState({
      success: false,
      message,
    });
  }
};


  return (
    <div className="flex items-center justify-center p-4 bg-gradient-to-br from-orange-50 via-pink-50 to-blue-50">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">
            Hello{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500">
              Travel
            </span>
          </h1>
          <p className="text-gray-600 mt-2">
            Start your adventure 🌍
          </p>
        </div>

        {/* Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-xl p-8"
        >
          <div className="space-y-5">
            {/* Profile Image */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-28 h-28 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
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

                <label className="absolute bottom-0 right-0 w-9 h-9 bg-pink-500 rounded-full flex items-center justify-center text-white cursor-pointer">
                  <Camera size={18} />
                  <input
                    type="file"
                    name="file"
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
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="name"
                placeholder="Username"
                required
                className="w-full pl-12 py-3 border rounded-xl bg-gray-50 focus:bg-white outline-none"
              />
            </div>

            {/* Full Name */}
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="fullName"
                placeholder="Full Name"
                required
                className="w-full pl-12 py-3 border rounded-xl bg-gray-50 focus:bg-white outline-none"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full pl-12 py-3 border rounded-xl bg-gray-50 focus:bg-white outline-none"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
                className="w-full pl-12 pr-12 py-3 border rounded-xl bg-gray-50 focus:bg-white outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                required
                className="w-full pl-12 pr-12 py-3 border rounded-xl bg-gray-50 focus:bg-white outline-none"
              />
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold disabled:opacity-50"
            >
              {isLoading ? "Creating..." : "Create Account"}
            </button>

            {/* Error */}
            {state?.success === false && (
              <div className="text-center text-sm text-red-600">
                {state.message}
              </div>
            )}

            <p className="text-center text-sm">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-pink-600 font-semibold"
              >
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
