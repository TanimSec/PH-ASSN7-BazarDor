"use client";

import React, { useEffect, useState } from "react";
import { Hero } from "@/components/hero";
import { ProductCard, ProductCardSkeleton } from "@/components/product-card";
import { getProducts } from "@/lib/api";
import { Product } from "@/types";
import { toBengaliNumber } from "@/lib/utils";
import { TrendingUp, TrendingDown, LayoutGrid } from "lucide-react";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Top 6 Risers (দাম বেড়েছে)
  const risers = [...products]
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  // Top 6 Fallers (দাম কমেছে)
  const fallers = [...products]
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, 6);

  return (
    <div className="space-y-12 pb-16">
      {/* 1. Hero Section */}
      <Hero />

      <div className="max-w-6xl mx-auto px-4 space-y-14">
        {/* 2. Section A — আজ দাম বেড়েছে ▲ */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#eafaf1] text-[#1a9951] flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#1d271f] flex items-center gap-2">
                  <span>আজ দাম বেড়েছে</span>
                  <span className="text-[#1a9951] text-lg font-black">▲</span>
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  গতকালের তুলনায় আজ যেসব পণ্যের দাম বৃদ্ধি পেয়েছে
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#eafaf1] text-[#1a9951]">
              শীর্ষ {toBengaliNumber(risers.length)}টি
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4.5">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)
              : risers.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>
        </section>

        {/* 3. Section B — আজ দাম কমেছে ▼ */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#fdf2f2] text-[#d03739] flex items-center justify-center">
                <TrendingDown className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#1d271f] flex items-center gap-2">
                  <span>আজ দাম কমেছে</span>
                  <span className="text-[#d03739] text-lg font-black">▼</span>
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  গতকালের তুলনায় আজ যেসব পণ্যের দাম হ্রাস পেয়েছে
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#fdf2f2] text-[#d03739]">
              শীর্ষ {toBengaliNumber(fallers.length)}টি
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4.5">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)
              : fallers.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>
        </section>

        {/* 4. Section C — সব পণ্য (#সব-পণ্য) */}
        <section id="সব-পণ্য" className="scroll-mt-24 pt-4 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#f0f5f0] text-[#05893e] flex items-center justify-center">
                <LayoutGrid className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#1d271f]">
                  সব পণ্য
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  নিত্যপ্রয়োজনীয় সকল পণ্যের আজকের বাজার দর তালিকা
                </p>
              </div>
            </div>

            {!isLoading && (
              <span className="text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full self-start sm:self-auto">
                মোট {toBengaliNumber(products.length)}টি পণ্য পাওয়া গেছে
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4.5">
            {isLoading
              ? Array.from({ length: 12 }).map((_, i) => <ProductCardSkeleton key={i} />)
              : products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>
        </section>
      </div>
    </div>
  );
}
