// this is the sql database to the disk 

import sqlite3 from "sqlite3"; // this is the sqlite3 module the database driver
import { open as sqliteOpen, Database } from "sqlite"; // this is the open function to open the database
import path from "path";
import { fileURLToPath } from "url";

import { User, Post, Like, Comment } from "../../types.js";
import { datastore } from "../index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// here we will make the database initialization
export class sqlDatastore implements datastore {
    async getUserById(id: string): Promise<User | undefined> {
        if (!this.db) {
            throw new Error("Database not initialized");
        }
        return await this.db.get<User>('SELECT * FROM Users WHERE id = ?', [id]);
    }

    private db: Database<sqlite3.Database, sqlite3.Statement> | undefined;

    // here we will open the database
    public async openDb(){
        this.db = await sqliteOpen({
            filename: path.join(__dirname, "Codersquare.sqlite"),
            driver: sqlite3.Database
        });

        this.db.run('PRAGMA foreign_keys = ON');
        await this.db.migrate({
            migrationsPath: path.join(__dirname, "migrations")
        })

        return this;
    }
    

    // Fort the posthandeler 
    async createPost(post: Post): Promise<void> {
        if (!this.db) {
            throw new Error("Database not initialized");
        }
        await this.db.run(
            'INSERT INTO Posts (id, title, url, userId, postedAt) VALUES (:id, :title, :url, :userId, :postedAt)',
            {
                ':id': post.id,
                ':title': post.title,
                ':url': post.url,
                ':userId': post.userId,
                ':postedAt': post.postedAt
            }
        );
    }

    async listPosts(): Promise<Post[]> {
        if (!this.db) {
            throw new Error("Database not initialized");
        }
        return await this.db.all('SELECT * FROM Posts');
    }






    // Fort the userhandeler 
    async createUser(user: User): Promise<void> {
        if (!this.db) {
            throw new Error("Database not initialized");
        }
        await this.db.run('INSERT INTO Users (id, email, fname, lname, password, username) VALUES (:id, :email, :fname, :lname, :password, :username)', {
            ':id': user.id,
            ':email': user.email,
            ':fname': user.fname,
            ':lname': user.lname,
            ':password': user.password,
            ':username': user.username
        });
    }
    async getUserByEmail(email: string): Promise<User | undefined> {
          
        if (!this.db) {
            throw new Error("Database not initialized");
        }
        return await this.db.get<User>('SELECT * FROM Users WHERE email = ?', [email]);
    }


    async getUserByUsername(id: string): Promise<User | undefined> {
        if (!this.db) {
            throw new Error("Database not initialized");
        }
        return await this.db.get('SELECT * FROM Users WHERE username = ?', [id]);
    }















    async getPostById(id: string): Promise<Post | undefined> {
        throw new Error("Method not implemented.");
    }
    async deletePost(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async createLike(like: Like): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async deleteLike(postId: string, userId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async createComment(comment: Comment): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async deleteComment(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async listComments(postId: string): Promise<Comment[]> {
        throw new Error("Method not implemented.");
    }
}