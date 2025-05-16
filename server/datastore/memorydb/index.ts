import { User, Post, Like, Comment } from "../../types.js";
import { datastore } from "../index.js";

export class inmMemoryDatastore implements datastore {

    private users: User[] = [];
    private posts: Post[] = [];
    private likes: Like[] = [];
    private comments: Comment[] = [];



    createUser(user: User): void {
        this.users.push(user);
    
    }
    
    
    
    getUserByEmial(email: string): User | undefined {
        return this.users.find(user => user.email === email);
    }
    
    
    getUserByUsername(id: string): User | undefined {
        return this.users.find(user => user.id === id);
    }
    
    
    createPost(post: Post): void {
         this.posts.push(post);
    }
    
    
    listPosts(): Post[] {
        return this.posts;
    }
    
    
    
    getPostById(id: string): Post | undefined {
        return this.posts.find(post => post.id === id);
    }
    
    
    
    deletePost(id: string): void {
        const index = this.posts.findIndex(post => post.id === id);
        if (index == -1) {
            return;
        }
        this.posts.splice(index, 1);
    }
    
    
    createLike(like: Like): void {
        this.likes.push(like);
    }

    
    createComment(comment: Comment): void {
        this.comments.push(comment);
    }



    deleteComment(id: string): void {
        const index = this.comments.findIndex(comment => comment.id === id);
        if (index == -1) {
            return;
        }
        this.comments.splice(index, 1);    }
    listComments(postId: string): Comment[] {
        return this.comments.filter(comment => comment.postId === postId);
    }
    
    deleteLike(postId: string, userId: string): void {
        const index = this.likes.findIndex(like => like.postId === postId && like.userId === userId);
        if (index !== -1) {
            this.likes.splice(index, 1);
        }
    }
}