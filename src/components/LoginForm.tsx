/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useActionState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { loginUser } from "@/services/auth/loginUser";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "./ui/alert";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  // ✅ useActionState
  const [state, formAction, isPending] = useActionState(loginUser, null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-100 to-blue-100 flex items-center justify-center px-4">
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

        {/* ✅ FORM */}
        <form action={formAction}>
          <CardContent className="space-y-6 pt-6">
            {/* Email */}
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="m@example.com"
                  className="pl-10 h-11 focus-visible:ring-2 focus-visible:ring-pink-400"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter your password"
                  className="pl-10 pr-10 h-11 focus-visible:ring-2 focus-visible:ring-pink-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <div className="text-right">
              <a
                href="/forget-password"
                className="text-sm text-pink-600 hover:underline"
              >
                Forgot password?
              </a>
            </div>

            {/* ❌ Error */}
            {state?.success === false && (
              <Alert variant="destructive">
                <AlertDescription>
                  {state.message || "Login failed"}
                </AlertDescription>
              </Alert>
            )}

            {/* ✅ Success */}
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
              disabled={isPending}
              className="w-full h-11 text-base font-semibold bg-gradient-to-r from-pink-500 to-orange-500 hover:opacity-90"
            >
              {isPending ? "Logging in..." : "Login"}
            </Button>

            <p className="text-sm text-muted-foreground text-center">
              Don&apos;t have an account?{" "}
              <a
                href="/register"
                className="font-semibold text-pink-600 hover:underline"
              >
                Sign up
              </a>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginForm;
