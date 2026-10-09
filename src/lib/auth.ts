import { betterAuth } from "better-auth";
import { memoryAdapter } from "better-auth/adapters/memory";

export const auth = betterAuth({
  database: memoryAdapter({}),
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
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
