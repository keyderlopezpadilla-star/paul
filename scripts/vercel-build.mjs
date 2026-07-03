#!/usr/bin/env node
/**
 * Vercel production build:
 *   1. Derive the Postgres connection strings (Neon-injected on Vercel),
 *      pinned to the dedicated `agropaul` schema.
 *   2. prisma generate → migrate deploy → seed (idempotent).
 *   3. next build.
 *
 * Runs the DB steps only when a connection string is available, so a plain
 * `next build` still works in environments without a database.
 */
import { execSync } from "node:child_process";

const SCHEMA = process.env.DATABASE_SCHEMA || "agropaul";

function withSchema(url) {
  if (!url) return url;
  if (/[?&]schema=/.test(url)) return url;
  return `${url}${url.includes("?") ? "&" : "?"}schema=${SCHEMA}`;
}

const pooled =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  process.env.POSTGRES_URL;

const direct =
  process.env.DIRECT_URL ||
  process.env.POSTGRES_URL_NON_POOLING ||
  process.env.DATABASE_URL_UNPOOLED ||
  pooled;

const env = { ...process.env };
if (pooled) env.DATABASE_URL = withSchema(pooled);
if (direct) env.DIRECT_URL = withSchema(direct);

const hasDb =
  Boolean(pooled) && !/@localhost|@127\.0\.0\.1/.test(pooled ?? "");

function run(cmd) {
  console.log(`\n$ ${cmd}`);
  execSync(cmd, { stdio: "inherit", env });
}

run("prisma generate");

if (hasDb) {
  run("prisma migrate deploy");
  try {
    run("tsx prisma/seed.ts");
  } catch (err) {
    console.warn("⚠ seed step failed (continuing):", err.message);
  }
} else {
  console.log("• No remote database detected — skipping migrate/seed.");
}

run("next build");
