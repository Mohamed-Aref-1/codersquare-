import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../auth.js";
import { expressHandler } from "../types.js";
import { initializeDb } from "../datastore/index.js";

// express willl call this middleware with the protected endpoint
// and it will add the user to the request

export const authMiddleware : expressHandler<any, any> = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(401).send("Unauthorized");
        return;
    }
    try {   
        const payload = verifyJwt(token);

        // TO DO
        console.log("check payload");
        
        console.log("payload", payload);
        const db = await initializeDb();
        const user = await db.getUserById(payload.UserId);
        console.log("user", user?.id);
        if (!user) {
            res.status(401).send("Not a valid user");
            return;
        }
        next();
    } catch (error) {
        res.status(401).send("Bad token");
    }
}
