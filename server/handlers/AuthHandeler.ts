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

    // Create new user
    const user: User = {
        id: crypto.randomUUID(),
        email,
        fname,
        lname,
        username,
        password
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
    if (user.password !== password) {
        res.status(401).send("Invalid credentials Password");
        return;
    }

    const jwt    = signJwt({ UserId: user.id });
    // Return user data without password
    res.status(200).send({
        id: user.id,
        email: user.email,
        fname: user.fname,
        lname: user.lname,
        username: user.username ,

        
        jwt: jwt
    });
}