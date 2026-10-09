"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import { getCategoryBySlug, getProducts } from "@/lib/api";
import { Category, Product, SortOption } from "@/types";
import { ProductCard, ProductCardSkeleton } from "@/components/product-card";
import { toBengaliNumber } from "@/lib/utils";
import { ArrowLeft, ChevronDown, SlidersHorizontal, AlertCircle } from "lucide-react";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [isSortOpen, setIsSortOpen] = useState<boolean>(false);

  useEffect(() => {
    async function loadCategoryData() {
      setIsLoading(true);
      try {
        const [catData, prodData] = await Promise.all([
          getCategoryBySlug(slug),
          getProducts(slug),
        ]);
        setCategory(catData);
        setProducts(prodData);
      } catch (err) {
        console.error("Failed to load category data:", err);
      } finally {
        setIsLoading(false);
      }
    }

    if (slug) {
      loadCategoryData();
    }
  }, [slug]);

  // C1 Challenge Requirement: Sort by numeric value
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-asc") {
      return a.today - b.today; // numeric ascending
    }
    if (sortBy === "price-desc") {
      return b.today - a.today; // numeric descending
    }
    return 0; // default order from API
  });

  const sortLabelMap: Record<SortOption, string> = {
    default: "ডিফল্ট",
    "price-asc": "দাম: কম থেকে বেশি",
    "price-desc": "দাম: বেশি থেকে কম",
  };

  // Empty state if finished loading and category is invalid or products array is empty
  if (!isLoading && (!category || products.length === 0)) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          কোনো পণ্য পাওয়া যায়নি
        </h1>
        <p className="text-gray-500 max-w-md mx-auto mb-6">
          এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য তালিকাভুক্ত নেই অথবা ক্যাটাগরিটি সঠিক নয়।
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Breadcrumb & Back */}
      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
        <Link href="/" className="hover:text-[#05893e] transition-colors">
          হোম
        </Link>
        <span>/</span>
        <span className="text-gray-800 font-semibold">
          {isLoading ? "লোড হচ্ছে..." : category?.nameBn}
        </span>
      </div>

      {/* Header Banner & Sort Control */}
      <div className="bg-white rounded-2xl border border-[#e2e8e2] p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {isLoading ? (
          <div className="space-y-2 animate-pulse">
            <div className="h-7 w-40 bg-gray-200 rounded" />
            <div className="h-4 w-60 bg-gray-200 rounded" />
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#f0f5f0] flex items-center justify-center text-3xl">
              {category?.icon || "🛒"}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1d271f]">
                {category?.nameBn}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                {toBengaliNumber(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
              </p>
            </div>
          </div>
        )}

        {/* C1: Sort dropdown ("সাজান" -> ডিফল্ট | দাম: কম থেকে বেশি | দাম: বেশি থেকে কম) */}
        {!isLoading && (
          <div className="relative self-start sm:self-auto">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 font-medium hidden md:inline">
                সাজান:
              </span>
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-gray-200 hover:border-[#05893e] bg-white text-xs sm:text-sm font-semibold text-gray-800 transition-colors shadow-2xs"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-gray-500" />
                <span>{sortLabelMap[sortBy]}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {isSortOpen && (
              <div
                className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-30 animate-in fade-in slide-in-from-top-1"
                onClick={() => setIsSortOpen(false)}
              >
                <div className="px-3 py-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  মূল্য অনুযায়ী সাজান
                </div>
                {(["default", "price-asc", "price-desc"] as SortOption[]).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSortBy(opt)}
                    className={`w-full text-left px-3.5 py-2 text-xs sm:text-sm flex items-center justify-between transition-colors ${
                      sortBy === opt
                        ? "bg-[#f3fbf4] text-[#05893e] font-bold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span>{sortLabelMap[opt]}</span>
                    {sortBy === opt && <span className="text-[#05893e]">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Product Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#1d271f]">
            {category?.nameBn ? `${category.nameBn} তালিকা` : "পণ্য তালিকা"}
          </h2>
          {!isLoading && (
            <span className="text-xs text-gray-500">
              মোট {toBengaliNumber(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4.5">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
      </div>
    </div>
  );
}
