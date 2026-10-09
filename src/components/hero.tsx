import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, CheckCircle2 } from "lucide-react";

export function Hero() {
  return (
    <section className="bg-linear-to-b from-[#f3fbf4] to-[#fafcfa] border-b border-[#e2e8e2] py-10 md:py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Column: Text & CTA */}
          <div className="md:col-span-7 space-y-5 text-center md:text-left">
            {/* Eyebrow / Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#05893e]/10 border border-[#05893e]/20 text-[#05893e] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#05893e] animate-pulse" />
              <span>দৈনিক বাজার আপডেট</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1d271f] tracking-tight leading-tight">
              আজকের বাজারের দাম <br className="hidden sm:inline" />
              <span className="text-[#05893e]">এক নজরে</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-600 max-w-xl leading-relaxed">
              ঢাকা সহ দেশের প্রধান প্রধান পাইকারি ও খুচরা বাজারের চাল, ডাল, তেল, সবজি, মাছ ও মাংসের সর্বশেষ দরদাম জেনে সাশ্রয়ী কেনাকাটা করুন।
            </p>

            {/* Feature Bullets */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-medium text-gray-600 pt-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#05893e]" />
                <span>প্রতিদিন আপডেট</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#05893e]" />
                <span>১২+ পাইকারি বাজার</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#05893e]" />
                <span>সঠিক মূল্য বিশ্লেষণ</span>
              </div>
            </div>

            {/* Primary CTA Button */}
            <div className="pt-2">
              <Link
                href="#সব-পণ্য"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#05893e] hover:bg-[#047f39] text-white font-semibold text-base shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>সব পণ্য দেখুন</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Banner Image */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-square md:aspect-auto md:h-80 rounded-2xl overflow-hidden p-2 flex items-center justify-center">
              <Image
                src="/bazar-hero.png"
                alt="বাজার দর"
                width={420}
                height={350}
                priority
                className="object-contain drop-shadow-md hover:scale-102 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
