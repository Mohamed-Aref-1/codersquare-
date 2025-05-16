import { printer } from "prettier/doc.js";
import { User, Post, Like, Comment } from "../../types.js";
import { datastore } from "../index.js";

export class inmMemoryDatastore implements datastore {

    private users: User[] = [];
    private posts: Post[] = [];
    private likes: Like[] = [];
    private comments: Comment[] = [];



    createUser(user: User): Promise<void> {
        this.users.push(user);
        return Promise.resolve();
    }
    
    
    
    getUserByEmial(email: string): Promise<User | undefined> {
        return Promise.resolve(this.users.find(user => user.email === email));
    }
    
    
    getUserByUsername(id: string): Promise<User | undefined> {
        return Promise.resolve(this.users.find(user => user.id === id));
    }
    
    
    createPost(post: Post): Promise<void> {
         this.posts.push(post);
         return Promise.resolve();
    }
    
    
    listPosts(): Promise<Post[]> {
            return Promise.resolve(this.posts);
    }
    
    
    
    getPostById(id: string): Promise<Post | undefined> {
        return Promise.resolve(this.posts.find(post => post.id === id));
    }
    
    
    
    deletePost(id: string): Promise<void> {
        const index = this.posts.findIndex(post => post.id === id);
        if (index == -1) {
            return Promise.resolve();
        }
        this.posts.splice(index, 1);
        return Promise.resolve();
    }
    
    
    createLike(like: Like): Promise<void> {
        this.likes.push(like);
        return Promise.resolve();
    }

    
    createComment(comment: Comment): Promise<void> {
        this.comments.push(comment);
        return Promise.resolve();
    }



    deleteComment(id: string): Promise<void> {
        const index = this.comments.findIndex(comment => comment.id === id);
        if (index == -1) {
            return Promise.resolve();
        }
        this.comments.splice(index, 1);
        return Promise.resolve();
    }
    listComments(postId: string): Promise<Comment[]> {
        return Promise.resolve(this.comments.filter(comment => comment.postId === postId));
    }
    
    deleteLike(postId: string, userId: string): Promise<void> {
        const index = this.likes.findIndex(like => like.postId === postId && like.userId === userId);
        if (index !== -1) {
            this.likes.splice(index, 1);
        }
        return Promise.resolve();
    }
}