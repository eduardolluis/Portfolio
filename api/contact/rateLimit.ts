const ipRateLimitMap = new Map<string, number>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const STALE_ENTRY_MS = 5 * 60 * 1000;

function cleanupRateLimitMap(now: number) {
  const cutoff = now - STALE_ENTRY_MS;
  for (const [ip, timestamp] of ipRateLimitMap.entries()) {
    if (timestamp < cutoff) {
      ipRateLimitMap.delete(ip);
    }
  }
}

export function isRateLimited(clientIp: string, now = Date.now()) {
  cleanupRateLimitMap(now);
  const lastRequestTime = ipRateLimitMap.get(clientIp);

  if (lastRequestTime && now - lastRequestTime < RATE_LIMIT_WINDOW_MS) {
    return true;
  }

  ipRateLimitMap.set(clientIp, now);
  return false;
}
