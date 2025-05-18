import { JwtObject } from "./types.js";
import jwt from "jsonwebtoken";


function getsecret(): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("Missing JWT_SECRET environment variable");
        process.exit(1);
    }
    return secret;
}

export function signJwt(object: JwtObject): string {
    const secret = getsecret();
    return jwt.sign(object, secret, { expiresIn: "1h" });
}

export function verifyJwt(token: string): JwtObject {
    const secret = getsecret();
    return jwt.verify(token, secret) as JwtObject;
}


