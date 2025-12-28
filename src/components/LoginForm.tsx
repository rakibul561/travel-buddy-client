/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";


import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
      router.push("/");
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
    <div
      className="bg-gradient-to-br from-orange-100 via-pink-100 to-blue-100 flex items-center justify-center px-4"
      {...props}
    >
      <Card className="w-full max-w-md rounded-3xl border border-white/40 bg-white/80 backdrop-blur-xl shadow-2xl">
        {/* Header */}
        <CardHeader className="text-center space-y-3 pb-2">
          <div className="mx-auto h-12 w-12 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center text-white text-xl">
            🌍
          </div>
          <CardTitle className="text-3xl font-extrabold tracking-tight">
            Hello
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500">
              Travel
            </span>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Welcome back! Continue your adventure
          </p>
        </CardHeader>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6 pt-6">
            {/* Email */}
            <div className="space-y-1">
              <Label>Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="m@example.com"
                  className="pl-10 h-11"
                  {...register("email", { required: true })}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <Label>Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-10 pr-10 h-11"
                  {...register("password", { required: true })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* Error */}
            {state?.success === false && (
              <Alert variant="destructive">
                <AlertDescription>
                  {state.message}
                </AlertDescription>
              </Alert>
            )}

            {/* Success */}
            {state?.success && (
              <Alert className="border-green-500 text-green-700 bg-green-50">
                <AlertDescription>
                  Login successful 🎉
                </AlertDescription>
              </Alert>
            )}
          </CardContent>

          {/* Footer */}
          <CardFooter className="flex flex-col gap-4 pt-2">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 text-base font-semibold bg-gradient-to-r from-pink-500 to-orange-500"
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>

            <p className="text-sm text-muted-foreground text-center">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-pink-600 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginForm;
