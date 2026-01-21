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
