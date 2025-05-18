// import { UserDao } from "./dao/UseDao.js";
// import { PostDao } from "./dao/PostDao.js";
// import { LikeDao } from "./dao/LikeDao.js";
// import { CommentDao } from "./dao/commentDao.js";
// import { inmMemoryDatastore } from "./memorydb/index.js";
import { sqlDatastore } from "./sql/index.js";
import { User, Post, Like, Comment, Tier } from "../types.js";

export interface datastore {
    // User methods
    getUserById(id: string): Promise<User | undefined>;
    getUserByEmail(email: string): Promise<User | undefined>;
    getUserByUsername(username: string): Promise<User | undefined>;
    createUser(user: User): Promise<void>;

    // Tier methods
    getTierById(id: number): Promise<Tier | undefined>;
    getAllTiers(): Promise<Tier[]>;

    // Post methods
    createPost(post: Post): Promise<void>;
    getPostById(id: string): Promise<Post | undefined>;
    listPosts(): Promise<Post[]>;
    deletePost(id: string): Promise<void>;

    // Like methods
    createLike(like: Like): Promise<void>;
    deleteLike(postId: string, userId: string): Promise<void>;

    // Comment methods
    createComment(comment: Comment): Promise<void>;
    deleteComment(id: string): Promise<void>;
    listComments(postId: string): Promise<Comment[]>;
}

// here we made the initialization and declaration in two different steps so that 
// we can use the same instance of the database in the whole application
// any one who want to use the data base should call the initializeDb function
let db: datastore;

export async function initializeDb(){
    if(!db){
        db = await new sqlDatastore().openDb();
    }
    return db;
}

