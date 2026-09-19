import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authConfig = {
  providers: [
    Credentials({
      name: "Admin",
      credentials: {
        email: { label: "E-Mail", type: "email" },
        password: { label: "Passwort", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.toString().trim().toLowerCase();
        const password = credentials?.password?.toString() ?? "";
        const adminEmail = (process.env.ADMIN_EMAIL ?? "").trim().toLowerCase();
        const adminPassword = process.env.ADMIN_PASSWORD ?? "";

        if (!adminEmail || !adminPassword || !email || !password) {
          return null;
        }
        if (email !== adminEmail || password !== adminPassword) {
          return null;
        }
        return { id: "admin", email: adminEmail, name: "Admin" };
      },
    }),
  ],
  pages: {
    signIn: "/admin",
  },
  session: { strategy: "jwt" },
  callbacks: {
    authorized({ auth, request }) {
      const path = request.nextUrl.pathname;
      const isLoggedIn = !!auth?.user;
      if (path.startsWith("/admin/") && path !== "/admin") {
        return isLoggedIn;
      }
      return true;
    },
  },
  trustHost: true,
} satisfies NextAuthConfig;
