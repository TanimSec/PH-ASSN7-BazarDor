import React from "react";
import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl border border-[#e2e8e2] p-8 sm:p-10 text-center shadow-xs space-y-6">
        <div className="w-20 h-20 rounded-2xl bg-red-50 text-[#d03739] flex items-center justify-center mx-auto text-4xl shadow-2xs">
          <SearchX className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-100 text-[#d03739]">
            ৪০৪ - পৃষ্ঠাটি পাওয়া যায়নি
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1d271f] pt-1">
            দুঃখিত, কোনো তথ্য মেলেনি!
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            আপনি যে ঠিকানাটি খুঁজছেন তা পরিবর্তিত হয়েছে অথবা পেজটি বিদ্যমান নেই।
          </p>
        </div>

        <div>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#05893e] hover:bg-[#047f39] text-white font-semibold text-sm shadow-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
