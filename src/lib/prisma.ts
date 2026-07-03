import { PrismaClient } from "@prisma/client";
import { resolveDatabaseUrl } from "@/lib/db-url";

/**
 * Prisma client singleton — avoids exhausting connections during dev HMR.
 *
 * The datasource URL is resolved at runtime so that on Vercel we can use the
 * Neon-injected connection string (POSTGRES_PRISMA_URL / DATABASE_URL) while
 * pinning everything to the dedicated `agropaul` Postgres schema — keeping this
 * app's tables isolated from anything else sharing the same database.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const datasourceUrl = resolveDatabaseUrl();

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    ...(datasourceUrl ? { datasourceUrl } : {}),
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
