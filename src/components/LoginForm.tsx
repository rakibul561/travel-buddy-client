/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Eye, EyeOff, Lock, Mail, ArrowRight, Compass } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Link from "next/link";
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
    defaultValues: { email: "", password: "" },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setState(null);
    try {
      const res = await login({ email: data.email, password: data.password }).unwrap();
      toast.success("Login successful 🎉");
      setState({ success: true });
      await new Promise(resolve => setTimeout(resolve, 300));
      router.push("/");
      router.refresh();
    } catch (error: any) {
      console.error("Login error:", error);
      const message = error?.data?.message || "Login failed";
      toast.error(message);
      setState({ success: false, message });
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#FAFAFA] text-foreground p-4 overflow-hidden" {...props}>
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-emerald-100/30 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-gray-200/40 rounded-full blur-[100px] -z-10" />
      </div>

      <div className="w-full max-w-[420px] relative z-10">
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
            <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
            <p className="text-muted-foreground text-sm">Enter your details to access your account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold ml-1">Email</Label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                <Input
                  type="email"
                  placeholder="name@example.com"
                  className="pl-12 h-12 bg-gray-50/50 border-gray-200 focus:bg-white rounded-xl transition-all"
                  {...register("email", { required: true })}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <Label className="text-sm font-semibold">Password</Label>
                <Link href="/forget-password" className="text-xs text-primary hover:underline font-medium">
                  Forgot password?
                </Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-12 pr-12 h-12 bg-gray-50/50 border-gray-200 focus:bg-white rounded-xl transition-all"
                  {...register("password", { required: true })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
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
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-xl flexitems-center justify-center gap-2 group transition-all"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
              )}
            </Button>

            {/* Divider */}
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-100" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-muted-foreground font-medium">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Login */}
            <button
              onClick={() => window.location.href = "http://localhost:5000/api/v1/users/auth/google"}
              type="button"
              className="w-full h-12 flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-foreground font-semibold rounded-xl transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
          </form>
        </div>

        {/* Footer Link */}
        <p className="text-center mt-6 text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/register" className="font-bold text-primary hover:underline transition-all">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
