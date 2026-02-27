/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Camera, Eye, EyeOff, Globe, Lock, Mail, User, Compass, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useRegisterMutation } from "../redux/feature/auth/auth.api";
import { Label } from "./ui/label";
import Link from "next/link";
import { Alert, AlertDescription } from "./ui/alert";

const RegisterForm = () => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [state, setState] = useState<any>(null);

  const [register, { isLoading }] = useRegisterMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState(null);

    try {
      const form = e.currentTarget;
      const rawFormData = new FormData(form);

      const file = rawFormData.get("file");
      const password = rawFormData.get("password") as string;
      const confirmPassword = rawFormData.get("confirmPassword") as string;

      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      const data = {
        name: rawFormData.get("name"),
        fullName: rawFormData.get("fullName"),
        email: rawFormData.get("email"),
        password,
        role: "USER",
      };

      const formData = new FormData();
      if (file && (file as File).size > 0) {
        formData.append("file", file as File);
      } else {
        toast.error("Profile picture is required");
        return;
      }
      formData.append("data", JSON.stringify(data));

      const res = await register(formData).unwrap();
      toast.success("Registration successful 🎉");
      formRef.current?.reset();
      setPreviewImage(null);
      router.push("/login");
    } catch (error: any) {
      console.error("Register error:", error);
      const message = error?.data?.message || "Registration failed";
      toast.error(message);
      setState({ success: false, message });
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#FAFAFA] text-foreground p-4 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-emerald-100/30 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-gray-200/40 rounded-full blur-[100px] -z-10" />
      </div>

      <div className="w-full max-w-[480px] relative z-10 py-10">
        {/* Logo area */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-primary-foreground transform group-hover:-rotate-3 transition-transform">
              <Compass className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight">TravelBuddy.</span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-100">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Create an account</h1>
            <p className="text-muted-foreground text-sm">Join our community of travelers today</p>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
            {/* Profile Image */}
            <div className="flex justify-center mb-6">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full bg-gray-50 border-2 border-dashed border-gray-200 overflow-hidden flex items-center justify-center transition-all group-hover:border-primary">
                  {previewImage ? (
                    <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-10 h-10 text-gray-300" />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground cursor-pointer hover:scale-110 transition-transform shadow-lg">
                  <Camera size={14} />
                  <input type="file" name="file" accept="image/*" className="hidden" onChange={handleFileChange} required />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Username */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold ml-1">Username</Label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                  <input name="name" placeholder="johndoe" required className="w-full pl-11 h-12 bg-gray-50/50 border border-gray-200 focus:bg-white rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm" />
                </div>
              </div>

              {/* Full Name */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold ml-1">Full Name</Label>
                <div className="relative group">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                  <input name="fullName" placeholder="John Doe" required className="w-full pl-11 h-12 bg-gray-50/50 border border-gray-200 focus:bg-white rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm" />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold ml-1">Email</Label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                <input type="email" name="email" placeholder="name@example.com" required className="w-full pl-11 h-12 bg-gray-50/50 border border-gray-200 focus:bg-white rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm" />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold ml-1">Password</Label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                <input type={showPassword ? "text" : "password"} name="password" placeholder="••••••••" required className="w-full pl-11 pr-11 h-12 bg-gray-50/50 border border-gray-200 focus:bg-white rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold ml-1">Confirm Password</Label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="••••••••" required className="w-full pl-11 pr-11 h-12 bg-gray-50/50 border border-gray-200 focus:bg-white rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm" />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors">
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {state?.success === false && (
              <Alert variant="destructive" className="animate-in fade-in zoom-in duration-300 rounded-xl bg-red-50 border-red-100 text-red-600">
                <AlertDescription>{state.message}</AlertDescription>
              </Alert>
            )}

            {/* Submit Button */}
            <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center gap-2 h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-xl transition-all disabled:opacity-70 group mt-2">
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign Up <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-primary hover:underline transition-all">
            Sign in instead
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
