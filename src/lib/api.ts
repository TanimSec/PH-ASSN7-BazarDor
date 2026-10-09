import { Category, Product } from "@/types";

const BASE_URL_1 = "https://api.api-store.workers.dev/api/bazardor";
const BASE_URL_2 = "https://api.abcz.workers.dev/api/bazardor";

async function fetchWithFallback<T>(endpoint: string): Promise<T> {
  try {
    const res = await fetch(`${BASE_URL_1}${endpoint}`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Continue to fallback
  }

  try {
    const res = await fetch(`${BASE_URL_2}${endpoint}`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.error(`Failed to fetch from both APIs for ${endpoint}:`, err);
  }

  throw new Error(`Failed to fetch data from APIs for ${endpoint}`);
}

export async function getCategories(): Promise<Category[]> {
  try {
    const data = await fetchWithFallback<Category[]>("/categories");
    if (Array.isArray(data)) return data;
    // @ts-expect-error fallback check if wrapped in value property
    if (data && Array.isArray(data.value)) return data.value;
    return [];
  } catch {
    return [
      { id: "chal", slug: "chal", nameBn: "চাল", icon: "🍚" },
      { id: "dal", slug: "dal", nameBn: "ডাল", icon: "🫘" },
      { id: "tel", slug: "tel", nameBn: "তেল", icon: "🛢️" },
      { id: "sobji", slug: "sobji", nameBn: "সবজি", icon: "🥬" },
      { id: "mach", slug: "mach", nameBn: "মাছ", icon: "🐟" },
      { id: "mangsho", slug: "mangsho", nameBn: "মাংস", icon: "🍗" },
      { id: "dim-dui", slug: "dim-dui", nameBn: "ডিম-দুধ", icon: "🥛" },
      { id: "mosla", slug: "mosla", nameBn: "মসলা", icon: "🌶️" },
    ];
  }
}

export async function getProducts(category?: string): Promise<Product[]> {
  const endpoint = category ? `/products?category=${encodeURIComponent(category)}` : "/products";
  try {
    const data = await fetchWithFallback<Product[]>(endpoint);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    // Fetch all products to find by slug or ID
    const all = await getProducts();
    const found = all.find(
      (p) => p.slug === slug || String(p.id) === slug
    );
    if (found) return found;

    // If slug is numeric, try direct endpoint /products/:id
    if (/^\d+$/.test(slug)) {
      const single = await fetchWithFallback<Product>(`/products/${slug}`);
      if (single && single.id) return single;
    }

    return null;
  } catch {
    return null;
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const categories = await getCategories();
    return categories.find((c) => c.slug === slug || c.id === slug) || null;
  } catch {
    return null;
  }
}
