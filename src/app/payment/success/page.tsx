import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PaymentSuccessPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center border border-primary/20 relative overflow-hidden">
                {/* Decorative background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-16 -mt-16" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl -ml-16 -mb-16" />

                <div className="relative z-10 space-y-6">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                        <CheckCircle className="w-12 h-12 text-primary" strokeWidth={3} />
                    </div>

                    <h1 className="text-3xl font-bold font-display text-gray-900">Payment Successful!</h1>

                    <p className="text-muted-foreground text-lg">
                        Thank you for your purchase. Your subscription has been activated successfully.
                    </p>

                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                        <p className="text-sm text-gray-600">Pro tip: It may take a few moments for your new features to appear. Refresh your dashboard if needed.</p>
                    </div>

                    <Link href="/user/dashboard">
                        <Button className="w-full h-12 rounded-xl btn-primary font-bold shadow-lg shadow-primary/20 text-lg group">
                            Go to Dashboard <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
