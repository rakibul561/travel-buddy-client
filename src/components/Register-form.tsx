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
  Sparkles,
  MapPin,
  Users,
  Globe2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import Logo from "../assets/Logo";
import { useRegisterMutation } from "../redux/feature/auth/auth.api";
import { Label } from "./ui/label";
import Link from "next/link";

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

      const message = error?.data?.message || "Registration failed";

      toast.error(message);
      setState({
        success: false,
        message,
      });
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-accent via-accent/90 to-primary relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <div className="mb-8 flex items-center gap-3">
            <div className="p-3 bg-white/20 backdrop-blur rounded-2xl">
              <Logo />
            </div>
            <span className="text-4xl font-bold font-display">Travel</span>
          </div>

          <h1 className="text-5xl font-extrabold mb-6 leading-tight font-display">
            Start Your Journey<br />
            Join Our Community
          </h1>

          <p className="text-xl text-white/90 mb-12 max-w-md leading-relaxed">
            Create your account and unlock a world of travel opportunities. Connect, explore, and adventure together!
          </p>

          {/* Features */}
          <div className="space-y-6">
            <div className="flex items-start gap-4 group">
              <div className="p-3 bg-white/20 backdrop-blur rounded-xl group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Discover Destinations</h3>
                <p className="text-white/80 text-sm">Access exclusive travel guides and tips</p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="p-3 bg-white/20 backdrop-blur rounded-xl group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Build Connections</h3>
                <p className="text-white/80 text-sm">Meet travelers from around the globe</p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="p-3 bg-white/20 backdrop-blur rounded-xl group-hover:scale-110 transition-transform">
                <Globe2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Share Experiences</h3>
                <p className="text-white/80 text-sm">Document and share your adventures</p>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-16 p-6 bg-white/10 backdrop-blur rounded-2xl border border-white/20">
            <h3 className="font-bold text-lg mb-4">Why Join Us?</h3>
            <ul className="space-y-2 text-white/90 text-sm">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                Free to join and use
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                Verified traveler community
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                Safe and secure platform
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background overflow-y-auto">
        <div className="w-full max-w-md py-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-2xl">
                <Logo />
              </div>
              <span className="text-3xl font-bold text-gradient font-display">Travel</span>
            </div>
          </div>

          {/* Form Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2 font-display">Create Your Account</h2>
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
              <Sparkles className="w-4 h-4 text-primary" />
              <p className="text-sm font-medium text-muted-foreground">
                Join our community of travelers
              </p>
            </div>
          </div>

          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
            {/* Profile Image */}
            <div className="flex justify-center">
              <div className="relative group">
                <div className="w-28 h-28 rounded-full bg-muted/50 border-2 border-border overflow-hidden flex items-center justify-center transition-all group-hover:border-primary">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12 text-muted-foreground" />
                  )}
                </div>

                <label className="absolute bottom-0 right-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground cursor-pointer hover:scale-110 transition-transform shadow-lg">
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
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-foreground">Username</Label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  name="name"
                  placeholder="Choose a username"
                  required
                  className="w-full pl-12 h-12 border-2 border-border rounded-xl bg-muted/50 focus:bg-card focus:border-primary outline-none transition-all text-foreground"
                />
              </div>
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-foreground">Full Name</Label>
              <div className="relative group">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  name="fullName"
                  placeholder="Your full name"
                  required
                  className="w-full pl-12 h-12 border-2 border-border rounded-xl bg-muted/50 focus:bg-card focus:border-primary outline-none transition-all text-foreground"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-foreground">Email Address</Label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  className="w-full pl-12 h-12 border-2 border-border rounded-xl bg-muted/50 focus:bg-card focus:border-primary outline-none transition-all text-foreground"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-foreground">Password</Label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a strong password"
                  required
                  className="w-full pl-12 pr-12 h-12 border-2 border-border rounded-xl bg-muted/50 focus:bg-card focus:border-primary outline-none transition-all text-foreground"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-foreground">Confirm Password</Label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  required
                  className="w-full pl-12 pr-12 h-12 border-2 border-border rounded-xl bg-muted/50 focus:bg-card focus:border-primary outline-none transition-all text-foreground"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {state?.success === false && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 animate-slide-in-from-top">
                {state.message}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full h-12 text-base font-bold shadow-glow disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating Account...
                </span>
              ) : (
                "Create Your Account"
              )}
            </button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-bold text-primary hover:underline">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
