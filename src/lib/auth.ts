import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { memoryAdapter } from "better-auth/adapters/memory";
import { db } from "./mongodb";

type MemoryDbSchema = Record<string, Record<string, unknown>[]>;

const globalForAuth = globalThis as unknown as {
  memoryDb?: MemoryDbSchema;
};

export const memoryDb: MemoryDbSchema =
  globalForAuth.memoryDb ||
  (globalForAuth.memoryDb = {
    user: [],
    session: [],
    account: [],
    verification: [],
  });

const getBaseUrl = () => {
  if (process.env.BETTER_AUTH_URL) return process.env.BETTER_AUTH_URL;
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
};

// Use official BetterAuth MongoDB adapter when MONGODB_URI is provided, fallback to memory
const databaseAdapter = db ? mongodbAdapter(db) : memoryAdapter(memoryDb);

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET || "bazardor-super-secret-auth-key-2026",
  database: databaseAdapter,
  baseURL: getBaseUrl(),
  trustedOrigins: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3001",
    process.env.NEXT_PUBLIC_APP_URL || "",
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "",
    "https://*.vercel.app",
  ].filter(Boolean),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "mock-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "mock-client-secret",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "mock-client-id",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "mock-client-secret",
    },
  },
});
