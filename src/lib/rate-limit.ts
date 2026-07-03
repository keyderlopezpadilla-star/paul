/**
 * Lightweight in-memory sliding-window rate limiter.
 *
 * Good enough for a single-instance deployment and to blunt casual abuse of
 * the public form endpoints. For horizontally-scaled production traffic, swap
 * the Map for a shared store (Upstash Redis / Vercel KV) behind the same API.
 */

type Bucket = { count: number; resetAt: number };

const store = new Map<string, Bucket>();

export type RateLimitResult = {
  success: boolean;
  remaining: number;
  resetAt: number;
};

export function rateLimit(
  key: string,
  { limit = 5, windowMs = 60_000 }: { limit?: number; windowMs?: number } = {},
): RateLimitResult {
  const now = Date.now();
  const bucket = store.get(key);

  if (!bucket || now > bucket.resetAt) {
    const resetAt = now + windowMs;
    store.set(key, { count: 1, resetAt });
    return { success: true, remaining: limit - 1, resetAt };
  }

  bucket.count += 1;
  const success = bucket.count <= limit;
  return {
    success,
    remaining: Math.max(0, limit - bucket.count),
    resetAt: bucket.resetAt,
  };
}

/**
 * Best-effort client IP extraction from standard proxy headers
 * (Vercel / most reverse proxies set `x-forwarded-for`).
 */
export function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return req.headers.get("x-real-ip")?.trim() || "anonymous";
}

// Periodically evict stale buckets so the Map can't grow unbounded.
if (typeof setInterval !== "undefined") {
  const timer = setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of store) {
      if (now > bucket.resetAt) store.delete(key);
    }
  }, 5 * 60_000);
  // Don't keep the event loop alive just for cleanup.
  (timer as { unref?: () => void }).unref?.();
}
