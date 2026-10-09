"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { getCategories, getProducts } from "@/lib/api";
import { Category, Product } from "@/types";
import { getBengaliDate, toBengaliNumber } from "@/lib/utils";
import { User as UserIcon, LogOut, ChevronDown, Menu, X } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [tickerProducts, setTickerProducts] = useState<Product[]>([]);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [banglaDate] = useState(() => getBengaliDate());

  useEffect(() => {
    async function loadNavData() {
      try {
        const [cats, prods] = await Promise.all([getCategories(), getProducts()]);
        setCategories(cats);
        setTickerProducts(prods.slice(0, 15));
      } catch (err) {
        console.error("Failed to load nav data:", err);
      }
    }
    loadNavData();
  }, []);

  return (
    <header className="w-full bg-white border-b border-[#e2e8e2] sticky top-0 z-50">
      {/* Top Navbar Row */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand Logo & Bangla Date */}
        <Link href="/" className="flex flex-col group">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🛒</span>
            <span className="text-2xl font-bold text-[#05893e] tracking-tight group-hover:text-[#047f39] transition-colors">
              বাজার দর
            </span>
          </div>
          <span className="text-xs text-gray-500 font-medium pl-8">
            {banglaDate || "আজকের বাজার দর"}
          </span>
        </Link>

        {/* Desktop Auth Controls */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 hover:border-[#05893e] transition-colors bg-[#fafcfa] text-sm font-medium text-gray-700"
              >
                <div className="w-7 h-7 rounded-full bg-[#05893e] text-white flex items-center justify-center text-xs font-bold">
                  {user.name ? user.name[0].toUpperCase() : "U"}
                </div>
                <span className="max-w-30 truncate">{user.name}</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>

              {userMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50 animate-in fade-in slide-in-from-top-2"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs text-gray-500">লগইন করা আছে</p>
                    <p className="text-sm font-semibold text-gray-800 truncate">{user.name}</p>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                  </div>
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-[#f3fbf4] hover:text-[#05893e] transition-colors"
                  >
                    <UserIcon className="w-4 h-4" />
                    প্রোফাইল
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    সাইন আউট
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/signin"
                className="px-4 py-1.5 rounded-lg text-sm font-semibold text-[#05893e] hover:bg-[#f3fbf4] transition-colors border border-transparent hover:border-[#05893e]/20"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="px-4 py-1.5 rounded-lg text-sm font-semibold text-white bg-[#05893e] hover:bg-[#047f39] transition-all shadow-sm hover:shadow"
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          {user && (
            <Link
              href="/profile"
              className="w-8 h-8 rounded-full bg-[#05893e] text-white flex items-center justify-center text-xs font-bold"
            >
              {user.name ? user.name[0].toUpperCase() : "U"}
            </Link>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Categories Row (Second Row / Navigation Links) */}
      <div className="border-t border-gray-100 bg-[#fafcfa]">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="flex items-center gap-1 overflow-x-auto py-2 no-scrollbar scroll-smooth">
            <Link
              href="/"
              className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                pathname === "/"
                  ? "bg-[#05893e] text-white shadow-xs"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              সব পণ্য
            </Link>
            {categories.map((cat) => {
              const active = pathname === `/category/${cat.slug}`;
              return (
                <Link
                  key={cat.id || cat.slug}
                  href={`/category/${cat.slug}`}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    active
                      ? "bg-[#05893e] text-white shadow-xs"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.nameBn}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-3 space-y-2">
          {user ? (
            <div className="space-y-2">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-bold text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
              >
                প্রোফাইল দেখুন
              </Link>
              <button
                onClick={() => {
                  signOut();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md"
              >
                সাইন আউট
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link
                href="/signin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2 text-sm font-semibold text-[#05893e] border border-[#05893e] rounded-lg"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2 text-sm font-semibold text-white bg-[#05893e] rounded-lg"
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Infinite Scrolling Price Ticker (Marquee) */}
      <div className="bg-[#f0f5f0] border-t border-b border-[#e2e8e2] overflow-hidden py-1.5 select-none">
        <div className="flex animate-ticker whitespace-nowrap text-xs font-medium text-gray-700">
          {/* Double array to create seamless continuous marquee loop */}
          {[...tickerProducts, ...tickerProducts].map((p, idx) => {
            const isUp = p.change.dir === "up";
            const isDown = p.change.dir === "down";
            return (
              <Link
                key={`${p.id}-${idx}`}
                href={`/product/${p.slug}`}
                className="inline-flex items-center gap-1.5 mx-4 hover:text-[#05893e] transition-colors"
              >
                <span>{p.image || p.categoryIcon || "🛒"}</span>
                <span className="font-semibold text-gray-900">{p.nameBn}</span>
                <span className="text-gray-600">
                  {toBengaliNumber(p.today)} টাকা/{p.unit === "kg" ? "কেজি" : p.unit}
                </span>
                <span
                  className={`inline-flex items-center text-[11px] font-bold ${
                    isUp ? "text-[#1a9951]" : isDown ? "text-[#d03739]" : "text-gray-500"
                  }`}
                >
                  {isUp && "▲"}
                  {isDown && "▼"}
                  {!isUp && !isDown && "—"}
                  {toBengaliNumber(Math.abs(p.change.pct))}%
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
