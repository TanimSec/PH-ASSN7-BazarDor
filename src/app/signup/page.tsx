"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { ArrowLeft, User, Mail, Lock, UserPlus, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();
  const { signUp, socialLogin, isLoading } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!name.trim()) {
      const msg = "অনুগ্রহ করে আপনার নাম লিখুন";
      setFormError(msg);
      toast.error(msg);
      return;
    }

    if (!email.trim()) {
      const msg = "অনুগ্রহ করে ইমেইল ঠিকানা দিন";
      setFormError(msg);
      toast.error(msg);
      return;
    }

    if (password.length < 6) {
      const msg = "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে";
      setFormError(msg);
      toast.error(msg);
      return;
    }

    if (password !== confirmPassword) {
      const msg = "পাসওয়ার্ড দুটি মেলেনি, অনুগ্রহ করে মিলিয়ে নিন";
      setFormError(msg);
      toast.error(msg);
      return;
    }

    setIsSubmitting(true);
    const success = await signUp(name.trim(), email.trim(), password);
    setIsSubmitting(false);

    if (success) {
      // Per requirement: If the user Register successfully then navigate him to his login page
      router.push("/signin");
    } else {
      const msg = "রেজিস্ট্রেশন ব্যর্থ হয়েছে। তথ্য যাচাই করে পুনরায় চেষ্টা করুন।";
      setFormError(msg);
    }
  };

  const handleSocialClick = async (provider: "google" | "github") => {
    setFormError("");
    await socialLogin(provider);
    setTimeout(() => {
      // Per requirement: On Clicking it user authenticate with Google Navigate the user to the Home page
      router.push("/");
    }, 1200);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl border border-[#e2e8e2] p-8 shadow-sm space-y-6">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#05893e] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>

        {/* Header */}
        <div className="space-y-1 text-center">
          <div className="inline-flex p-3 rounded-2xl bg-[#f0f5f0] text-3xl mb-2">
            🛒
          </div>
          <h1 className="text-2xl font-bold text-[#1d271f]">অ্যাকাউন্ট তৈরি করুন</h1>
          <p className="text-xs sm:text-sm text-gray-500">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        {/* Form Error Banner */}
        {formError && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-[#d03739] text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              নাম
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setFormError("");
                }}
                placeholder="যেমন: রহিম উদ্দিন"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#05893e] focus:ring-1 focus:ring-[#05893e] text-sm text-gray-900 placeholder:text-gray-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              ইমেইল
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setFormError("");
                }}
                placeholder="you@example.com"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#05893e] focus:ring-1 focus:ring-[#05893e] text-sm text-gray-900 placeholder:text-gray-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              পাসওয়ার্ড
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setFormError("");
                }}
                placeholder="কমপক্ষে ৮ অক্ষর"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#05893e] focus:ring-1 focus:ring-[#05893e] text-sm text-gray-900 placeholder:text-gray-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setFormError("");
                }}
                placeholder="আবার লিখুন"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#05893e] focus:ring-1 focus:ring-[#05893e] text-sm text-gray-900 placeholder:text-gray-400 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="w-full py-2.5 rounded-xl bg-[#05893e] hover:bg-[#047f39] text-white font-semibold text-sm shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <UserPlus className="w-4 h-4" />
            <span>{isSubmitting ? "রেজিস্ট্রেশন হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}</span>
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-gray-200 w-full" />
          <span className="bg-white px-3 text-xs text-gray-400 font-medium">অথবা</span>
        </div>

        {/* Social Logins */}
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={() => handleSocialClick("google")}
            className="w-full py-2.5 px-4 rounded-xl border border-gray-200 hover:bg-gray-50 text-xs sm:text-sm font-semibold text-gray-700 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Google দিয়ে চালিয়ে যান</span>
          </button>

          <button
            type="button"
            onClick={() => handleSocialClick("github")}
            className="w-full py-2.5 px-4 rounded-xl border border-gray-200 hover:bg-gray-50 text-xs sm:text-sm font-semibold text-gray-700 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>GitHub দিয়ে চালিয়ে যান</span>
          </button>
        </div>

        {/* Footer Link */}
        <p className="text-center text-xs text-gray-500 pt-2">
          অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/signin"
            className="font-semibold text-[#05893e] hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </div>
    </div>
  );
}
