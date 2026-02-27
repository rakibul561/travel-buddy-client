"use client";

import { useGoogleLoginMutation } from "@/redux/feature/auth/auth.api";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import toast from "react-hot-toast";

function OAuthCallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const code = searchParams.get("code");
    const [googleLogin, { isLoading }] = useGoogleLoginMutation();

    useEffect(() => {
        const handleGoogleLogin = async () => {
            if (!code) {
                toast.error("No authorization code found");
                router.push("/login");
                return;
            }

            try {
                await googleLogin(code).unwrap();
                toast.success("Google login successful! 🎉");
                router.push("/");
            } catch (error: any) {
                console.error("Google login error:", error);
                toast.error("Failed to login with Google");
                router.push("/login");
            }
        };

        if (code) {
            handleGoogleLogin();
        }
    }, [code, googleLogin, router]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
            <div className="text-center space-y-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
                <h1 className="text-2xl font-bold text-slate-800">
                    Verifying your account...
                </h1>
                <p className="text-slate-500">Please wait while we connect you.</p>
            </div>
        </div>
    );
}

export default function OAuthCallbackPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <OAuthCallbackContent />
        </Suspense>
    );
}
