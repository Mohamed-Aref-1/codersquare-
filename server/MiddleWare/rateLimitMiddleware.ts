import { Request, Response, NextFunction } from "express";
import { initializeDb } from "../datastore/index.js";
import { verifyJwt } from "../auth.js";


// In-memory store for request counts this is Teezy 
// In production, this should be replaced with Redis or similar
interface RequestCount {
    count: number;
    resetTime: number;
}

const requestStore = new Map<string, RequestCount>();

export const rateLimitMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {

        // TO DO 
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const payload = verifyJwt(token);

        const userId = payload.UserId;

        console.log("userIdss", userId);
        if (!userId) {
            res.status(401).json({ error: "Unauthorizeddd d" });
            return;
        } 
 
        const db = await initializeDb();
        const user = await db.getUserById(userId);
        console.log("user", user);
        if (!user) {
            res.status(401).json({ error: "User not found" });
            return;
        }

        const tier = await db.getTierById(user.tier_id);
        if (!tier) {
            res.status(500).json({ error: "Tier not found" });
            return;
        }

        const now = Date.now();
        const userRequests = requestStore.get(userId) || { count: 0, resetTime: now + tier.time_window * 1000 };

        if (now > userRequests.resetTime) {
            userRequests.count = 0;
            userRequests.resetTime = now + tier.time_window * 1000;
        }

        if (userRequests.count >= tier.request_limit) {
            const resetTime = new Date(userRequests.resetTime).toISOString();
            res.status(429).json({
                error: "Rate limit exceeded",
                message: `You have exceeded your ${tier.tier_name} tier limit of ${tier.request_limit} requests per ${tier.time_window} seconds`,
                resetTime
            });
            return;
        }

        userRequests.count++;
        requestStore.set(userId, userRequests);

        res.setHeader('X-RateLimit-Limit', tier.request_limit.toString());
        res.setHeader('X-RateLimit-Remaining', (tier.request_limit - userRequests.count).toString());
        res.setHeader('X-RateLimit-Reset', userRequests.resetTime.toString());

        next();
    } catch (error) {
        console.error('Rate limit error:', error);
        next(error);
    }
}; 