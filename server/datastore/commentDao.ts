import { Comment } from "../types.js";

export interface CommentDao{
    createComment(comment: Comment): void;
    deleteComment(id: string): void;
    listComments(postId: string): Comment[];
}
