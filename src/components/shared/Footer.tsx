"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe2, Mail, Twitter, Instagram, Linkedin, Facebook, Map, Compass, Phone } from "lucide-react";

const Footer = () => {
  const pathName = usePathname();

  // Hide footer on dashboard pages
  if (pathName.includes("/dashboard")) {
    return null;
  }

  return (
    <footer className="bg-[#0B1120] text-slate-300 py-16 px-6 md:px-12 relative overflow-hidden border-t border-slate-800/50">
      {/* Decorative gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[128px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">

          {/* Brand & Newsletter Section - Spans 2 cols */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center border border-blue-500/30 group-hover:bg-blue-600/30 transition-colors">
                <Globe2 className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 tracking-tight">
                TravelBuddy
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Your ultimate intelligent companion for international adventures. We streamline your travel planning with AI-powered insights, visa requirements, and transit advice.
            </p>

            <div className="pt-2">
              <h4 className="text-sm font-semibold text-white mb-3">Subscribe to our newsletter</h4>
              <div className="flex w-full max-w-sm items-center space-x-2">
                <div className="relative w-full">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-white placeholder-slate-500"
                  />
                </div>
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Links Section */}
          <div className="space-y-6">
            <h4 className="text-slate-100 font-semibold tracking-wide">Explore</h4>
            <ul className="space-y-3">
              <li><Link href="/destinations" className="text-sm text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2"><Map className="w-3.5 h-3.5" /> Destinations</Link></li>
              <li><Link href="/itineraries" className="text-sm text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2"><Compass className="w-3.5 h-3.5" /> Trip Planner</Link></li>
              <li><Link href="/visa-guide" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">Visa Requirements</Link></li>
              <li><Link href="/travel-alerts" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">Live Alerts & Info</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-slate-100 font-semibold tracking-wide">Platform</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link href="/pricing" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">Pricing Plans</Link></li>
              <li><Link href="/blog" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">Travel Blog</Link></li>
              <li><Link href="/contact" className="text-sm text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> Contact Support</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-slate-100 font-semibold tracking-wide">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">Cookie Policy</Link></li>
              <li><Link href="/accessibility" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">Accessibility</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-800 mt-8 gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} TravelBuddy. All rights reserved.
          </p>

          <div className="flex items-center space-x-5">
            <a href="#" className="text-slate-500 hover:text-blue-400 transition-colors p-2 hover:bg-slate-800 rounded-full">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-4 w-4" />
            </a>
            <a href="#" className="text-slate-500 hover:text-blue-400 transition-colors p-2 hover:bg-slate-800 rounded-full">
              <span className="sr-only">Instagram</span>
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" className="text-slate-500 hover:text-blue-400 transition-colors p-2 hover:bg-slate-800 rounded-full">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-4 w-4" />
            </a>
            <a href="#" className="text-slate-500 hover:text-blue-400 transition-colors p-2 hover:bg-slate-800 rounded-full">
              <span className="sr-only">Facebook</span>
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
