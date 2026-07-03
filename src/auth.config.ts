import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe auth configuration (no database imports).
 * Shared by middleware and the full Node-side auth instance.
 */
export const authConfig = {
  trustHost: true,
  pages: { signIn: "/admin/login" },
  session: { strategy: "jwt" },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;
      const isLoginPage = pathname === "/admin/login";

      if (pathname.startsWith("/admin")) {
        if (isLoginPage) {
          if (isLoggedIn) return Response.redirect(new URL("/admin", nextUrl));
          return true;
        }
        return isLoggedIn; // redirects to signIn page when false
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role ?? "admin";
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.id as string;
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
  },
  providers: [], // added in auth.ts (Node runtime)
} satisfies NextAuthConfig;
