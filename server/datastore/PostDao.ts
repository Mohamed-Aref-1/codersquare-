import { Post } from "../types.js";

export interface PostDao{
    createPost(post: Post): void;
    listPosts(): Post[];
    getPostById(id: string): Post | undefined;
    deletePost(id: string): void;
    
}