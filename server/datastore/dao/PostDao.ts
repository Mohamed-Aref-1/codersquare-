import { Post } from "../../types.js";

export interface PostDao{
    
    createPost(post: Post): Promise<void>;
    listPosts(): Promise<Post[]>;
    getPostById(id: string): Promise<Post | undefined>;
    deletePost(id: string): Promise<void>;
    
}
