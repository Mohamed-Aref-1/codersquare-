import { Request, Response, NextFunction } from "express";
import { initializeDb } from "../datastore/index.js";
import { verifyJwt } from "../auth.js";
import { Redis } from "ioredis";

// Redis client configuration
const redis = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASSWORD,
    retryStrategy: (times: number) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
    }
});

// Configuration constants
const DEFAULT_WINDOW = 60; // 60 seconds default window 
const MAX_REQUESTS = 100; // Default max requests per window

// Redis key prefix for rate limiting
const RATE_LIMIT_PREFIX = 'rate_limit:';

export const rateLimitMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Verify authentication
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            res.status(401).json({ error: "Authentication required" });
            return;
        }

        const payload = verifyJwt(token);
        const userId = payload.UserId;

        if (!userId) {
            res.status(401).json({ error: "Invalid authentication token" });
            return;
        }

        // Get user and tier information
        const db = await initializeDb();
        const user = await db.getUserById(userId);
        
        if (!user) {
            res.status(401).json({ error: "User not found" });
            return;
        }

        const tier = await db.getTierById(user.tier_id);
        if (!tier) {
            res.status(500).json({ error: "Service configuration error" });
            return;
        }

        const requestLimit = tier.request_limit || MAX_REQUESTS;
        const timeWindow = tier.time_window || DEFAULT_WINDOW;
        
        // Create a unique key for this user and API endpoint combination
        const apiPath = req.path;
        const key = `${RATE_LIMIT_PREFIX}${userId}:${apiPath}`;

        // Get current count and TTL
        const [count, ttl] = await Promise.all([
            redis.incr(key),
            redis.ttl(key)
        ]);

        // If this is the first request in the window, set the expiry
        if (count === 1) {
            await redis.expire(key, timeWindow);
        }

        // If TTL is -1 (no expiry) or -2 (key doesn't exist), set it
        if (ttl < 0) {
            await redis.expire(key, timeWindow);
        }

        // Check if rate limit is exceeded
        if (count > requestLimit) {
            const resetTime = new Date(Date.now() + (ttl * 1000)).toISOString();
            res.status(429).json({
                error: "Rate limit exceeded",
                message: `You have exceeded your ${tier.tier_name} tier limit of ${requestLimit} requests per ${timeWindow} seconds for this API endpoint`,
                resetTime,
                endpoint: apiPath
            });
            return;
        }

        // Set rate limit headers
        res.setHeader('X-RateLimit-Limit', requestLimit.toString());
        res.setHeader('X-RateLimit-Remaining', Math.max(0, requestLimit - count).toString());
        res.setHeader('X-RateLimit-Reset', new Date(Date.now() + (ttl * 1000)).toISOString());
        res.setHeader('X-RateLimit-Endpoint', apiPath);

        next();
    } catch (error) {
        console.error('Rate limit error:', error);
        next(error);
    }
}; 