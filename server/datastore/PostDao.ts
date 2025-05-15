import { post } from "../types.js";

export interface PostDao{
    createPost(post: post): void;
    listPosts(): post[];
    getPostById(id: string): post | undefined;
    deletePost(id: string): void;
    
}