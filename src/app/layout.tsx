import Navbar from "@/components/shared/Navbar";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Footer from "../components/shared/Footer";
import ReduxProvider from "../Helpers/Provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Travel Buddy",
  description: "Travel Buddy platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReduxProvider>
          {/* ✅ NOW Navbar has Redux context */}
          <Navbar />

          {children}

          <Toaster position="top-right" reverseOrder={false} />
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
