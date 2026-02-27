"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import toast from "react-hot-toast";
import { useSendOtpMutation, useVerifyOtpMutation } from "@/redux/feature/auth/auth.api";
import { KeyRound, Mail, ArrowRight, ShieldCheck, Compass } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ForgetPasswordPage() {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);

    const [sendOtp, { isLoading: isSending }] = useSendOtpMutation();
    const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
    const router = useRouter();

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            toast.error("Please enter your email address");
            return;
        }

        try {
            await sendOtp({ email, name: "User" }).unwrap();
            toast.success("Verification code sent to your email!");
            setStep(2);
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to send reset code. Email might not exist.");
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        const otpCode = otp.join("");
        if (otpCode.length < 6) {
            toast.error("Please enter the complete 6-digit code");
            return;
        }

        try {
            await verifyOtp({ email, otp: otpCode }).unwrap();
            toast.success("Email verified successfully!");
            setStep(3);
        } catch (error: any) {
            toast.error(error?.data?.message || "Invalid or expired verification code.");
        }
    };

    const handleFinalReset = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("Password reset simulated successfully. Please login.");
        setTimeout(() => {
            router.push("/login");
        }, 1500);
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center bg-[#FAFAFA] text-foreground p-4 overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-emerald-100/30 rounded-full blur-[100px] -z-10" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-gray-200/40 rounded-full blur-[100px] -z-10" />
            </div>

            <div className="w-full max-w-[420px] relative z-10 py-10">
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
                    {step === 1 && (
                        <div className="relative z-10 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="flex justify-center mb-6">
                                <div className="w-16 h-16 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center text-primary rotate-3 transition-transform hover:rotate-6">
                                    <KeyRound className="w-8 h-8" />
                                </div>
                            </div>
                            <div className="text-center mb-8">
                                <h1 className="text-2xl font-bold mb-2">Forgot Password?</h1>
                                <p className="text-muted-foreground text-sm">
                                    No worries! Enter your email and we'll send you a verification code.
                                </p>
                            </div>
                            <form className="space-y-5" onSubmit={handleSendOtp}>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-semibold ml-1">
                                        Email Address
                                    </Label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            className="pl-12 h-12 bg-gray-50/50 border-gray-200 focus:bg-white rounded-xl transition-all"
                                            placeholder="name@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-xl flex items-center justify-center gap-2 group transition-all"
                                    disabled={isSending}
                                >
                                    {isSending ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <>Send Code <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                                    )}
                                </Button>
                            </form>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="relative z-10 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="flex justify-center mb-6">
                                <div className="w-16 h-16 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-center text-emerald-500 -rotate-3 transition-transform hover:-rotate-6">
                                    <ShieldCheck className="w-8 h-8" />
                                </div>
                            </div>
                            <div className="text-center mb-8">
                                <h1 className="text-2xl font-bold mb-2">Check Your Email</h1>
                                <p className="text-muted-foreground text-sm">
                                    We've sent a 6-digit code to <span className="font-semibold text-foreground">{email}</span>.
                                </p>
                            </div>
                            <form className="space-y-8" onSubmit={handleVerifyOtp}>
                                <div className="flex justify-between gap-2">
                                    {otp.map((digit, idx) => (
                                        <Input
                                            key={idx}
                                            id={`otp-${idx}`}
                                            type="text"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => {
                                                const newOtp = [...otp];
                                                newOtp[idx] = e.target.value.replace(/[^0-9]/g, "");
                                                setOtp(newOtp);
                                                if (e.target.value && idx < 5) {
                                                    const nextInput = document.getElementById(`otp-${idx + 1}`);
                                                    nextInput?.focus();
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
                                                    const prevInput = document.getElementById(`otp-${idx - 1}`);
                                                    prevInput?.focus();
                                                }
                                            }}
                                            className="w-12 h-14 text-center text-xl font-bold rounded-xl bg-gray-50 border-gray-200 focus:bg-white"
                                        />
                                    ))}
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-xl flex items-center justify-center gap-2 group transition-all"
                                    disabled={isVerifying || otp.join("").length < 6}
                                >
                                    {isVerifying ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        "Verify Code"
                                    )}
                                </Button>

                                <p className="text-center text-sm text-muted-foreground">
                                    Didn't receive the code?{" "}
                                    <button type="button" onClick={handleSendOtp} className="text-primary font-bold hover:underline transition-all">
                                        Resend
                                    </button>
                                </p>
                            </form>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="relative z-10 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="text-center mb-8">
                                <h1 className="text-2xl font-bold mb-2">Set New Password</h1>
                                <p className="text-muted-foreground text-sm">
                                    Secure your account with a fresh, strong password.
                                </p>
                            </div>
                            <form className="space-y-5" onSubmit={handleFinalReset}>
                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold ml-1">New Password</Label>
                                    <Input
                                        type="password"
                                        required
                                        className="pl-4 h-12 bg-gray-50/50 border-gray-200 focus:bg-white rounded-xl transition-all"
                                        placeholder="••••••••"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold ml-1">Confirm Password</Label>
                                    <Input
                                        type="password"
                                        required
                                        className="pl-4 h-12 bg-gray-50/50 border-gray-200 focus:bg-white rounded-xl transition-all"
                                        placeholder="••••••••"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-xl flex items-center justify-center transition-all mt-6"
                                >
                                    Reset Password
                                </Button>
                            </form>
                        </div>
                    )}
                </div>

                {step === 1 && (
                    <p className="text-center mt-6 text-sm text-muted-foreground">
                        Remember your password?{" "}
                        <Link href="/login" className="font-bold text-primary hover:underline transition-all">
                            Login here
                        </Link>
                    </p>
                )}
            </div>
        </div>
    );
}
