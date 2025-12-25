"use client";

import { useActionState, useRef } from "react";
import { Button } from "./ui/button";
import { registerUser } from "@/services/auth/registerUser";

const RegisterForm = () => {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [state, formAction, isPending] = useActionState(registerUser, null);

  console.log("state is =>", state);

  return (
    <form action={formAction} className="max-w-md mx-auto space-y-4">
      
      <input
        name="name"
        placeholder="name"
        required
        className="w-full border p-2 rounded"
      />
      <input
        name="fullName"
        placeholder="Full Name"
        required
        className="w-full border p-2 rounded"
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        className="w-full border p-2 rounded"
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        required
        className="w-full border p-2 rounded"
      />

      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        required
        className="w-full border p-2 rounded"
      />

      {/* 🔥 Profile Image */}
      <input
        ref={fileRef}
        name="file"
        type="file"
        accept="image/*"
        required
        className="w-full"
      />

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Creating..." : "Create Account"}
      </Button>

      {state?.success === false && (
        <p className="text-red-500 text-sm text-center">
          {state.message}
        </p>
      )}

      {state?.success && (
        <p className="text-green-600 text-sm text-center">
          Account created successfully 🎉
        </p>
      )}
    </form>
  );
};

export default RegisterForm;
