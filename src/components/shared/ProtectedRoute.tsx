"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUserInfoQuery } from "../../redux/feature/auth/auth.api";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { data, isLoading } = useUserInfoQuery(undefined);
    const user = data?.data;
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!isLoading && !user && mounted) {
            router.push("/login"); // Redirect to login if unauthenticated
        }
    }, [user, isLoading, router, mounted]);

    if (!mounted || isLoading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return <>{children}</>;
}
