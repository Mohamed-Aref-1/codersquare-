import { User } from "../types.js";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

let db: any;

export async function initializeDb() {
    db = await open({
        filename: "codersquare.db",
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            email TEXT UNIQUE NOT NULL,
            fname TEXT NOT NULL,
            lname TEXT NOT NULL,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    `);
}

export const userStore = {
    async getUserByEmial(email: string): Promise<User | null> {
        const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
        return user || null;
    },

    async getUserByUsername(username: string): Promise<User | null> {
        const user = await db.get("SELECT * FROM users WHERE username = ?", [username]);
        return user || null;
    },

    async createUser(id: string, email: string, fname: string, lname: string, password: string, username: string): Promise<User> {
        const user: User = {
            id,
            email,
            fname,
            lname,
            username,
            password
        };
        
        await db.run(
            "INSERT INTO users (id, email, fname, lname, username, password) VALUES (?, ?, ?, ?, ?, ?)",
            [id, email, fname, lname, username, password]
        );
        
        return user;
    }
};