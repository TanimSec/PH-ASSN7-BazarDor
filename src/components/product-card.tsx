import React from "react";
import Link from "next/link";
import { Product } from "@/types";
import { formatUnit, toBengaliNumber } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block bg-white rounded-2xl border border-[#e2e8e2] p-4.5 transition-all duration-200 hover:shadow-md hover:border-[#05893e]/50 hover:-translate-y-0.5"
    >
      <div className="flex items-start gap-3.5 mb-3">
        {/* Emoji Thumbnail */}
        <div className="w-12 h-12 rounded-xl bg-[#f0f5f0] flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform">
          {product.image || product.categoryIcon || "🛒"}
        </div>

        {/* Product Name & Unit */}
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-base text-[#1d271f] group-hover:text-[#05893e] transition-colors truncate">
            {product.nameBn}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5 font-medium">
            {formatUnit(product.unit)}
          </p>
        </div>
      </div>

      {/* Price & Change Badge Row */}
      <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
        <div>
          <span className="text-[11px] text-gray-400 block font-medium">আজকের দাম</span>
          <span className="text-base font-bold text-[#1d271f]">
            {toBengaliNumber(product.today)}{" "}
            <span className="text-xs font-normal text-gray-600">টাকা</span>
          </span>
        </div>

        {/* Change Badge */}
        <div
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
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
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4.5 animate-pulse">
      <div className="flex items-start gap-3.5 mb-3">
        <div className="w-12 h-12 rounded-xl bg-gray-200 shrink-0" />
        <div className="flex-1 space-y-2 py-1">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
      <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
        <div className="space-y-1">
          <div className="h-2.5 bg-gray-200 rounded w-12" />
          <div className="h-4 bg-gray-200 rounded w-16" />
        </div>
        <div className="h-6 w-14 bg-gray-200 rounded-full" />
      </div>
    </div>
  );
}
