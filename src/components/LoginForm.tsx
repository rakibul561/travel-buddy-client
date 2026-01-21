/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Eye, EyeOff, Lock, Mail, Sparkles, MapPin, Users, Globe2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Link from "next/link";
import Logo from "../assets/Logo";
import { useLogInMutation } from "../redux/feature/auth/auth.api";

const LoginForm = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState<any>(null);

  const [login, { isLoading }] = useLogInMutation();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setState(null);

    try {
      const res = await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      console.log("LOGIN RESPONSE:", res);

      toast.success("Login successful 🎉");
      setState({ success: true });

      // Cookie/token set হওয়ার জন্য একটু wait করুন
      await new Promise(resolve => setTimeout(resolve, 300));

      // Router দিয়ে redirect করুন এবং page refresh করুন
      router.push("/");
      router.refresh();

    } catch (error: any) {
      console.error("Login error:", error);

      const message =
        error?.data?.message || "Login failed";

      toast.error(message);
      setState({
        success: false,
        message,
      });
    }
  };

  return (
    <div className="min-h-screen flex" {...props}>
      {/* LEFT SIDE - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary/90 to-accent relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl" />
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
            Welcome Back to<br />
            Your Next Adventure
          </h1>

          <p className="text-xl text-white/90 mb-12 max-w-md leading-relaxed">
            Connect with fellow travelers, discover amazing destinations, and create unforgettable memories around the world.
          </p>

          {/* Features */}
          <div className="space-y-6">
            <div className="flex items-start gap-4 group">
              <div className="p-3 bg-white/20 backdrop-blur rounded-xl group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Explore Destinations</h3>
                <p className="text-white/80 text-sm">Discover hidden gems and popular spots worldwide</p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="p-3 bg-white/20 backdrop-blur rounded-xl group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Meet Travel Buddies</h3>
                <p className="text-white/80 text-sm">Connect with like-minded adventurers</p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="p-3 bg-white/20 backdrop-blur rounded-xl group-hover:scale-110 transition-transform">
                <Globe2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Plan Together</h3>
                <p className="text-white/80 text-sm">Organize trips and share experiences</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 flex gap-12">
            <div>
              <div className="text-4xl font-bold mb-1">50K+</div>
              <div className="text-white/80 text-sm">Active Travelers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-1">120+</div>
              <div className="text-white/80 text-sm">Countries</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-1">10K+</div>
              <div className="text-white/80 text-sm">Trips Planned</div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
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
            <h2 className="text-3xl font-bold text-foreground mb-2 font-display">Login to Your Account</h2>
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
              <Sparkles className="w-4 h-4 text-primary" />
              <p className="text-sm font-medium text-muted-foreground">
                Continue your journey
              </p>
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-foreground">Email Address</Label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  type="email"
                  placeholder="you@example.com"
                  className="pl-12 h-12 bg-muted/50 border-2 border-border focus:border-primary focus:bg-card transition-all rounded-xl"
                  {...register("email", { required: true })}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold text-foreground">Password</Label>
                <Link href="/forget-password" className="text-xs text-primary hover:underline font-medium">
                  Forgot password?
                </Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-12 pr-12 h-12 bg-muted/50 border-2 border-border focus:border-primary focus:bg-card transition-all rounded-xl"
                  {...register("password", { required: true })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {state?.success === false && (
              <Alert variant="destructive" className="animate-slide-in-from-top">
                <AlertDescription>{state.message}</AlertDescription>
              </Alert>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full h-12 text-base font-bold shadow-glow"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Logging in...
                </span>
              ) : (
                "Login to Your Account"
              )}
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground font-medium">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Login */}
            <Button
              onClick={() =>
                window.open("http://localhost:5000/api/v1/users/auth/google")
              }
              type="button"
              variant="outline"
              className="w-full h-12 border-2 hover:bg-muted/50 transition-all font-semibold"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>

            {/* Sign Up Link */}
            <p className="text-sm text-muted-foreground text-center">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-bold text-primary hover:underline"
              >
                Sign up for free
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
