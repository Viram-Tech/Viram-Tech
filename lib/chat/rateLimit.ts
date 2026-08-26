import { LIMITS } from "@/lib/chat/guardrails";

/**
 * Per-IP fixed-window limiter held in module memory.
 *
 * Good enough for a single-region deployment: it caps a visitor hammering the
 * widget, which is what actually burns the free-tier quota. It does NOT hold
 * across serverless instances — if this ever needs to be exact, swap the Map
 * for Vercel KV or Upstash behind the same function signature.
 */
const hits = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(ip: string): { ok: boolean; retryAfterSec: number } {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + LIMITS.rateLimitWindowMs });
    if (hits.size > 5000) {
      for (const [k, v] of hits) if (now > v.resetAt) hits.delete(k);
    }
    return { ok: true, retryAfterSec: 0 };
  }

  entry.count += 1;
  if (entry.count > LIMITS.rateLimitRequests) {
    return { ok: false, retryAfterSec: Math.ceil((entry.resetAt - now) / 1000) };
  }
  return { ok: true, retryAfterSec: 0 };
}
