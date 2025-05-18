import { initializeDb } from "../datastore/index.js";
import { Request, Response, RequestHandler } from "express";
import { expressHandler, User } from "../types.js";
import crypto from "crypto";
import {
    signupRequest,
    signupResponse,
    signInRequest,
    signInResponse,
} from "../api.js";
import { signJwt } from "../auth.js";

const db = await initializeDb();
export const PASSWORD_KEY = process.env.PASSWORD_SALT as string; 
if (!PASSWORD_KEY) {
    console.error("PASSWORD_SALT environment variable is required");
    process.exit(1);
}

function hashPassword(password: string): string {
    const hash = crypto.pbkdf2Sync(password, PASSWORD_KEY, 1000, 64, 'sha512').toString('hex');
    return hash;
}

function verifyPassword(password: string, hashedPassword: string): boolean {
    const verifyHash = crypto.pbkdf2Sync(password, PASSWORD_KEY, 1000, 64, 'sha512').toString('hex');
    return hashedPassword === verifyHash;
}

export const signUpHandler: expressHandler<signupRequest, signupResponse> = async (req: Request, res: Response) => {
    const {email, fname, lname, username, password} = req.body;
    if (!email || !fname || !lname || !username || !password) {
        res.status(400).json({error: "Missing required fields"});
        return;
    }

    // Check if user already exists
    const existingUser = await db.getUserByEmail(email) || await db.getUserByUsername(username);
    if (existingUser) {
        res.status(400).json({error: "User already exists"});
        return;
    }

    const hashedPassword = hashPassword(password);
    // Create new user
    const user: User = {
        id: crypto.randomUUID(),
        email,
        fname,
        lname,
        username,
        password: hashedPassword,
        tier_id: 1
    };

    await db.createUser(user);
    const token = signJwt({ UserId: user.id });
    res.status(200).send({ token });
}

export const loginHandler: expressHandler<signInRequest, signInResponse> = async (req: Request, res: Response) => {
    const { login, password } = req.body;
    if (!login || !password) {
        res.status(400).json({ error: "Missing required fields" });
        return;
    }

    // Try to find user by email or username
    const user = await db.getUserByEmail(login) || await db.getUserByUsername(login);
    
    if (!user) {
        res.status(401).send("Invalid credentials Email or Username");
        return;
    }

    // Check password
    if (!verifyPassword(password, user.password)) {
        res.status(401).send("Invalid credentials Password");
        return;
    }

    const jwt = signJwt({ UserId: user.id });
    // Return user data without password
    res.status(200).send({
        id: user.id,
        email: user.email,
        fname: user.fname,
        lname: user.lname,
        username: user.username,
        jwt: jwt
    });
}