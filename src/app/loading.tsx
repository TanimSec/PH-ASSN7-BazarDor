import React from "react";

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-6 animate-pulse">
      <div className="h-44 bg-white rounded-2xl border border-gray-200 p-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-36 bg-white rounded-2xl border border-gray-200" />
        ))}
      </div>
    </div>
  );
}
