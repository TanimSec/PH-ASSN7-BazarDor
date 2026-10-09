"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { getProductBySlug } from "@/lib/api";
import { Product } from "@/types";
import { formatUnit, toBengaliNumber } from "@/lib/utils";
import toast from "react-hot-toast";
import { ArrowLeft, Store, MapPin, AlertCircle, TrendingUp, TrendingDown } from "lucide-react";

interface ProductDetailsPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Authentication Protection Check
  useEffect(() => {
    if (!isAuthLoading && !user) {
      toast.error("পণ্যের বিস্তারিত ও বাজার বিশ্লেষণ দেখতে অনুগ্রহ করে আগে সাইন ইন করুন");
      router.push(`/signin?redirect=/product/${encodeURIComponent(slug)}`);
    }
  }, [user, isAuthLoading, router, slug]);

  // Load product data
  useEffect(() => {
    async function loadProduct() {
      setIsLoading(true);
      try {
        const data = await getProductBySlug(slug);
        setProduct(data);
      } catch (err) {
        console.error("Failed to load product:", err);
      } finally {
        setIsLoading(false);
      }
    }

    if (slug) {
      loadProduct();
    }
  }, [slug]);

  if (isAuthLoading || (isLoading && !product)) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
        <div className="h-44 bg-white rounded-2xl border border-gray-200 p-6 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-28 bg-white rounded-xl border border-gray-200 animate-pulse" />
          <div className="h-28 bg-white rounded-xl border border-gray-200 animate-pulse" />
          <div className="h-28 bg-white rounded-xl border border-gray-200 animate-pulse" />
        </div>
        <div className="h-64 bg-white rounded-2xl border border-gray-200 animate-pulse" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          পণ্যটি খুঁজে পাওয়া যায়নি
        </h1>
        <p className="text-gray-500 max-w-md mx-auto mb-6">
          অনুরোধকৃত পণ্যের বিস্তারিত তথ্য পাওয়া যায়নি অথবা পণ্যটি অপসারিত হয়েছে।
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#05893e] hover:bg-[#047f39] text-white font-semibold text-sm transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>
    );
  }

  // Calculate Market stats
  const markets = product.markets || [];
  let minPrice = product.today;
  let maxPrice = product.today;
  let minMarketName = "";
  let maxMarketName = "";
  let sumAvg = 0;

  if (markets.length > 0) {
    minPrice = Math.min(...markets.map((m) => m.min));
    maxPrice = Math.max(...markets.map((m) => m.max));
    const minM = markets.find((m) => m.min === minPrice);
    const maxM = markets.find((m) => m.max === maxPrice);
    minMarketName = minM ? `${minM.market} (${minM.division})` : "";
    maxMarketName = maxM ? `${maxM.market} (${maxM.division})` : "";
    const sum = markets.reduce((acc, m) => acc + (m.min + m.max) / 2, 0);
    sumAvg = Math.round(sum / markets.length);
  } else {
    sumAvg = product.today;
  }

  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";
  const diffYesterday = Math.abs(product.today - product.yesterday);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
        <Link href="/" className="hover:text-[#05893e] transition-colors">
          হোম
        </Link>
        <span>/</span>
        <Link
          href={`/category/${product.category}`}
          className="hover:text-[#05893e] transition-colors"
        >
          {product.categoryNameBn || "ক্যাটাগরি"}
        </Link>
        <span>/</span>
        <span className="text-gray-800 font-semibold">{product.nameBn}</span>
      </div>

      {/* Top — Summary Header Banner */}
      <div className="bg-white rounded-2xl border border-[#e2e8e2] p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4 sm:gap-5">
          {/* Emoji */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#f0f5f0] flex items-center justify-center text-4xl sm:text-5xl shrink-0">
            {product.image || product.categoryIcon || "🛒"}
          </div>

          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1d271f]">
                {product.nameBn}
              </h1>
              {/* Category Tag */}
              <Link
                href={`/category/${product.category}`}
                className="px-2.5 py-0.5 rounded-full bg-[#f3fbf4] text-[#05893e] text-xs font-semibold hover:bg-[#05893e] hover:text-white transition-colors"
              >
                {product.categoryNameBn || product.category}
              </Link>
            </div>

            {/* Market Summary Line */}
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              {isUp && `গতকালের তুলনায় আজ দাম বেড়েছে · ${toBengaliNumber(diffYesterday)} টাকা`}
              {isDown && `গতকালের তুলনায় আজ দাম কমেছে · ${toBengaliNumber(diffYesterday)} টাকা`}
              {!isUp && !isDown && `গতকালের দামের অপরিবর্তিত রয়েছে · ০ টাকা`}
            </p>

            {/* Unit */}
            <p className="text-xs text-gray-600 font-medium">
              একক: <span className="font-semibold text-gray-800">{formatUnit(product.unit)}</span>
            </p>
          </div>
        </div>

        {/* Current Price & Change Badge */}
        <div className="bg-[#fafcfa] border border-[#e2e8e2] rounded-xl p-4 sm:min-w-50 flex md:flex-col items-center justify-between md:items-end gap-2">
          <div>
            <span className="text-xs text-gray-400 block md:text-right font-medium">আজকের জাতীয় গড় দর</span>
            <div className="text-2xl sm:text-3xl font-black text-[#1d271f] md:text-right">
              {toBengaliNumber(product.today)}{" "}
              <span className="text-sm font-normal text-gray-600">টাকা</span>
            </div>
          </div>
          <div
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
              isUp
                ? "bg-[#eafaf1] text-[#1a9951]"
                : isDown
                ? "bg-[#fdf2f2] text-[#d03739]"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <span>{isUp ? "▲" : isDown ? "▼" : "—"}</span>
            <span>{toBengaliNumber(Math.abs(product.change.pct))}%</span>
          </div>
        </div>
      </div>

      {/* Price Summary Cards: Minimum, Maximum, Average */}
      <div>
        <h2 className="text-lg font-bold text-[#1d271f] mb-4">দামের সারসংক্ষেপ</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Minimum Price */}
          <div className="bg-white rounded-2xl border border-[#e2e8e2] p-5 shadow-xs">
            <div className="flex items-center justify-between text-gray-500 text-xs font-medium mb-1">
              <span>সর্বনিম্ন দাম</span>
              <TrendingDown className="w-4 h-4 text-[#1a9951]" />
            </div>
            <div className="text-2xl font-black text-[#1d271f]">
              {toBengaliNumber(minPrice)}{" "}
              <span className="text-xs font-normal text-gray-600">টাকা</span>
            </div>
            {minMarketName && (
              <p className="text-xs text-gray-500 mt-2 truncate">
                সবচেয়ে কম: <span className="font-semibold text-gray-700">{minMarketName}</span>
              </p>
            )}
          </div>

          {/* Average Price */}
          <div className="bg-white rounded-2xl border border-[#e2e8e2] p-5 shadow-xs">
            <div className="flex items-center justify-between text-gray-500 text-xs font-medium mb-1">
              <span>গড় দাম</span>
              <span className="text-xs font-bold text-[#05893e]">জাতীয় গড়</span>
            </div>
            <div className="text-2xl font-black text-[#05893e]">
              {toBengaliNumber(sumAvg)}{" "}
              <span className="text-xs font-normal text-gray-600">টাকা</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {formatUnit(product.unit)}-এর হিসাবে বাজার সমন্বিত গড়
            </p>
          </div>

          {/* Maximum Price */}
          <div className="bg-white rounded-2xl border border-[#e2e8e2] p-5 shadow-xs">
            <div className="flex items-center justify-between text-gray-500 text-xs font-medium mb-1">
              <span>সর্বাধিক দাম</span>
              <TrendingUp className="w-4 h-4 text-[#d03739]" />
            </div>
            <div className="text-2xl font-black text-[#1d271f]">
              {toBengaliNumber(maxPrice)}{" "}
              <span className="text-xs font-normal text-gray-600">টাকা</span>
            </div>
            {maxMarketName && (
              <p className="text-xs text-gray-500 mt-2 truncate">
                সবচেয়ে বেশি: <span className="font-semibold text-gray-700">{maxMarketName}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* বাজারভিত্তিক আজকের দাম (Market Breakdown Table) */}
      <div className="bg-white rounded-2xl border border-[#e2e8e2] p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Store className="w-5 h-5 text-[#05893e]" />
            <h2 className="text-lg font-bold text-[#1d271f]">
              বাজারভিত্তিক আজকের দাম
            </h2>
          </div>
          <span className="text-xs text-gray-500 font-medium">
            মোট {toBengaliNumber(markets.length)}টি বাজার
          </span>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-xs font-bold text-gray-500 bg-gray-50/50">
                <th className="py-3 px-4">বাজারের নাম</th>
                <th className="py-3 px-4">বিভাগ</th>
                <th className="py-3 px-4 text-right">সর্বনিম্ন</th>
                <th className="py-3 px-4 text-right">সর্বাধিক</th>
                <th className="py-3 px-4 text-right">গড় দাম</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {markets.map((m, idx) => {
                const avg = Math.round((m.min + m.max) / 2);
                return (
                  <tr
                    key={idx}
                    className="hover:bg-[#fafcfa] transition-colors font-medium text-gray-800"
                  >
                    <td className="py-3 px-4 font-semibold text-[#1d271f] flex items-center gap-1.5">
                      <Store className="w-3.5 h-3.5 text-gray-400" />
                      <span>{m.market}</span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gray-100 text-xs font-medium">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        {m.division}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-gray-700">
                      {toBengaliNumber(m.min)} টাকা
                    </td>
                    <td className="py-3 px-4 text-right text-gray-700">
                      {toBengaliNumber(m.max)} টাকা
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-[#05893e]">
                      {toBengaliNumber(avg)} টাকা
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
