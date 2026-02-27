import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";
import ReduxProvider from "../Helpers/Provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Travel Buddy - Find Your Perfect Travel Companion",
    template: "%s | Travel Buddy",
  },
  description: "Join the ultimate platform for travelers. Find travel buddies, plan trips, and explore the world together with personalized matching.",
  keywords: ["travel", "travel buddy", "trip planning", "backpacking", "find travelers", "vacation"],
  authors: [{ name: "Md Nayeem Miah" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://travel-buddy.com/",
    title: "Travel Buddy - Find Your Perfect Travel Companion",
    description: "Join the ultimate platform for travelers. Find travel buddies, plan trips, and explore the world together.",
    siteName: "Travel Buddy",
    images: [
      {
        url: "/og-image.jpg", // Make sure to add this image in the public folder eventually
        width: 1200,
        height: 630,
        alt: "Travel Buddy OG Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel Buddy - Find Your Perfect Travel Companion",
    description: "Join the ultimate platform for travelers. Find travel buddies, plan trips, and explore the world together.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <ReduxProvider>

          <Navbar></Navbar>
          {children}
          <Footer></Footer>

          <Toaster position="top-right" reverseOrder={false} />

        </ReduxProvider>
      </body>
    </html>
  );
}
