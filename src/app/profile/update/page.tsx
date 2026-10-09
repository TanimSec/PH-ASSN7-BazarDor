"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { ArrowLeft, User, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

export default function ProfileUpdatePage() {
  const router = useRouter();
  const { user, isLoading, updateUser } = useAuth();
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      toast.error("অনুগ্রহ করে আগে সাইন ইন করুন");
      router.push("/signin?redirect=/profile/update");
    } else if (user) {
      setName(user.name);
    }
  }, [user, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("অনুগ্রহ করে একটি নাম লিখুন");
      return;
    }

    setIsSubmitting(true);
    // Call BetterAuth user update API
    const success = await updateUser(name.trim());
    setIsSubmitting(false);

    if (success) {
      router.push("/profile");
    }
  };

  if (isLoading || !user) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 animate-pulse space-y-6">
        <div className="h-6 w-32 bg-gray-200 rounded" />
        <div className="h-64 bg-white rounded-3xl border border-gray-200 p-8" />
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-12 space-y-6">
      {/* Back to Profile Link */}
      <Link
        href="/profile"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#05893e] transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>প্রোফাইলে ফিরে যান</span>
      </Link>

      <div className="bg-white rounded-3xl border border-[#e2e8e2] p-8 shadow-sm space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-[#1d271f]">তথ্য আপডেট করুন</h1>
          <p className="text-xs sm:text-sm text-gray-500">
            আপনার অ্যাকাউন্টের প্রদর্শিত নাম পরিবর্তন করুন।
          </p>
        </div>

        {/* Update Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              নাম (Name)
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="আপনার নাম লিখুন"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#05893e] focus:ring-1 focus:ring-[#05893e] text-sm text-gray-900 placeholder:text-gray-400 transition-colors"
              />
            </div>
            <p className="text-[11px] text-gray-400 mt-1">
              BetterAuth প্রোফাইল হ্যান্ডলারের মাধ্যমে নাম সংরক্ষিত হবে।
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">
              ইমেইল (Email - অপরিবর্তনযোগ্য)
            </label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full px-4 py-2.5 rounded-xl border border-gray-100 bg-gray-50 text-sm text-gray-400 cursor-not-allowed"
            />
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2.5 rounded-xl bg-[#05893e] hover:bg-[#047f39] text-white font-semibold text-sm shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSubmitting ? "আপডেট হচ্ছে..." : "তথ্য আপডেট করুন"}</span>
            </button>

            <Link
              href="/profile"
              className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-semibold transition-colors"
            >
              বাতিল
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
