import { createServerFn } from "@tanstack/react-start";

// Mock DB for tracking usage by IP/fingerprint
// In a real app, this would use Redis, Supabase, etc.
const scanUsageDB: Record<string, number> = {};

export const checkScanLimit = createServerFn({ method: "POST" })
  .validator((data: { fingerprint: string }) => data)
  .handler(async ({ data, request }) => {
    // 1. Get IP address (mocked safely if not available)
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("remote-addr") || "unknown-ip";
    const fingerprint = data.fingerprint || "unknown-fingerprint";
    
    const trackingKey = `${ip}-${fingerprint}`;
    
    // 2. Check usage
    const currentScans = scanUsageDB[trackingKey] || 0;
    
    // 3. Return allowed status
    if (currentScans >= 5) {
      return { allowed: false, remaining: 0 };
    }
    
    return { allowed: true, remaining: 5 - currentScans };
  });

export const recordScan = createServerFn({ method: "POST" })
  .validator((data: { fingerprint: string }) => data)
  .handler(async ({ data, request }) => {
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("remote-addr") || "unknown-ip";
    const fingerprint = data.fingerprint || "unknown-fingerprint";
    const trackingKey = `${ip}-${fingerprint}`;
    
    const currentScans = scanUsageDB[trackingKey] || 0;
    scanUsageDB[trackingKey] = currentScans + 1;
    
    return { remaining: 5 - (currentScans + 1) };
  });
