import { user, post, like, comment } from "../../types.js";
import { datastore } from "../index.js";

export class inmMemoryDatastore implements datastore {

    private users: user[] = [];
    private posts: post[] = [];
    private likes: like[] = [];
    private comments: comment[] = [];



    createUser(user: user): void {
        this.users.push(user);
    
    }
    
    
    
    getUserByEmial(email: string): user | undefined {
        return this.users.find(user => user.email === email);
    }
    
    
    getUserByUsername(id: string): user | undefined {
        return this.users.find(user => user.id === id);
    }
    
    
    createPost(post: post): void {
         this.posts.push(post);
    }
    
    
    listPosts(): post[] {
        return this.posts;
    }
    
    
    
    getPostById(id: string): post | undefined {
        return this.posts.find(post => post.id === id);
    }
    
    
    
    deletePost(id: string): void {
        const index = this.posts.findIndex(post => post.id === id);
        if (index == -1) {
            return;
        }
        this.posts.splice(index, 1);
    }
    
    
    createLike(like: like): void {
        this.likes.push(like);
    }

    
    createComment(comment: comment): void {
        this.comments.push(comment);
    }



    deleteComment(id: string): void {
        const index = this.comments.findIndex(comment => comment.id === id);
        if (index == -1) {
            return;
        }
        this.comments.splice(index, 1);    }
    listComments(postId: string): comment[] {
        return this.comments.filter(comment => comment.postId === postId);
    }
    
    deleteLike(postId: string, userId: string): void {
        const index = this.likes.findIndex(like => like.postId === postId && like.userId === userId);
        if (index !== -1) {
            this.likes.splice(index, 1);
        }
    }
}