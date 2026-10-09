import type { Metadata } from "next";
import React, { Suspense } from "react";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/auth-context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "react-hot-toast";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

export const metadata: Metadata = {
  title: "বাজার দর (BazarDor) - নিত্যপ্রয়োজনীয় পণ্যের বাজার দর",
  description:
    "ঢাকা সহ দেশের প্রধান বাজারের নিত্যপ্রয়োজনীয় পণ্যের নির্ভরযোগ্য আজকের বাজার দর জানুন। স্বর্ণমাছি চাল, মিনিকেট চাল, ইলিশ মাছ, পেঁয়াজ সহ সকল পণ্যের দাম এক নজরে।",
  icons: {
    icon: "/logo-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className={hindSiliguri.variable}>
      <body className="bg-[#fafcfa] text-[#1d271f] font-bangla antialiased min-h-screen flex flex-col">
        <AuthProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#ffffff",
                color: "#1d271f",
                border: "1px solid #e2e8e2",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                fontSize: "14px",
                fontFamily: "var(--font-bangla)",
              },
            }}
          />
          <Suspense fallback={<div className="w-full h-24 bg-white border-b border-[#e2e8e2]" />}>
            <Navbar />
          </Suspense>
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
