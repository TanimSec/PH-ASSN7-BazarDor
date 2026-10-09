import React from "react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[#e2e8e2] bg-[#f0f5f0] py-6 text-sm text-gray-600">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
        <div className="flex items-center gap-2 font-medium text-gray-800">
          <span className="text-lg">🛒</span>
          <span>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</span>
        </div>
        <div className="text-xs text-gray-500 italic">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </div>
      </div>
    </footer>
  );
}
