/**
 * Resolves the PostgreSQL connection string for the app, pinned to a dedicated
 * Postgres schema so Agropaul's tables never collide with other apps sharing
 * the same Neon database.
 *
 * Precedence:
 *   1. DATABASE_URL (explicit — used locally and can override on Vercel)
 *   2. POSTGRES_PRISMA_URL (Neon/Vercel pooled, PgBouncer-ready)
 *   3. POSTGRES_URL
 *
 * The `schema` query param is appended when missing.
 */

export const DB_SCHEMA = process.env.DATABASE_SCHEMA || "agropaul";

export function withSchema(url: string, schema = DB_SCHEMA): string {
  if (!url) return url;
  if (/[?&]schema=/.test(url)) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}schema=${schema}`;
}

export function resolveDatabaseUrl(): string | undefined {
  const base =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL;
  if (!base) return undefined;
  return withSchema(base);
}

/** Direct (non-pooled) URL used for migrations. */
export function resolveDirectUrl(): string | undefined {
  const base =
    process.env.DIRECT_URL ||
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.DATABASE_URL_UNPOOLED ||
    resolveDatabaseUrl();
  if (!base) return undefined;
  return withSchema(base);
}
