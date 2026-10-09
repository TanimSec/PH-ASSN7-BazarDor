"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Mail, ShieldCheck, Edit3, LogOut, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading, signOut } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      toast.error("প্রোফাইল দেখতে অনুগ্রহ করে আগে সাইন ইন করুন");
      router.push("/signin?redirect=/profile");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 animate-pulse space-y-6">
        <div className="h-6 w-32 bg-gray-200 rounded" />
        <div className="h-64 bg-white rounded-3xl border border-gray-200 p-8" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      {/* Back Link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#05893e] transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>হোম পেজে ফিরে যান</span>
      </Link>

      <div className="bg-white rounded-3xl border border-[#e2e8e2] p-8 shadow-xs space-y-8">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-gray-100 pb-8 text-center sm:text-left">
          <div className="w-24 h-24 rounded-full bg-[#05893e] text-white flex items-center justify-center text-4xl font-bold shadow-md">
            {user.name ? user.name[0].toUpperCase() : "U"}
          </div>

          <div className="flex-1 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eafaf1] text-[#1a9951] text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>সক্রিয় অ্যাকাউন্ট</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1d271f]">
              {user.name}
            </h1>
            <p className="text-sm text-gray-500 flex items-center justify-center sm:justify-start gap-1.5">
              <Mail className="w-4 h-4 text-gray-400" />
              <span>{user.email}</span>
            </p>
          </div>

          {/* C3: Update Button leading to update route */}
          <Link
            href="/profile/update"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#05893e] hover:bg-[#047f39] text-white text-sm font-semibold shadow-xs hover:shadow transition-all"
          >
            <Edit3 className="w-4 h-4" />
            <span>তথ্য আপডেট</span>
          </Link>
        </div>

        {/* Profile Information List */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-[#1d271f]">ব্যবহারকারীর বিবরণ</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#fafcfa] border border-gray-100">
              <span className="text-xs text-gray-400 font-medium block">পূর্ণ নাম</span>
              <span className="text-sm font-bold text-gray-800 mt-1 block">
                {user.name}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#fafcfa] border border-gray-100">
              <span className="text-xs text-gray-400 font-medium block">ইমেইল ঠিকানা</span>
              <span className="text-sm font-bold text-gray-800 mt-1 block">
                {user.email}
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/profile/update"
            className="w-full sm:w-auto text-center px-4 py-2 rounded-xl border border-[#05893e] text-[#05893e] hover:bg-[#f3fbf4] text-sm font-semibold transition-colors"
          >
            নাম পরিবর্তন করুন
          </Link>

          <button
            onClick={() => signOut()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 border border-red-200 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>↩ সাইন আউট</span>
          </button>
        </div>
      </div>
    </div>
  );
}
