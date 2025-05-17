import { Post , u, User} from "../../types.js";

export interface PostDao{
    
    createPost(post: Post): Promise<void>;
    listPosts(): Promise<Post[]>;
    getPostById(id: string): Promise<Post | undefined>;
    deletePost(id: string): Promise<void>;
    createUser(user: User): Promise<void>;
    getUserByEmail(email: string): Promise<User | undefined>;
    getUserByUsername(username: string): Promise<User | undefined>;
}
