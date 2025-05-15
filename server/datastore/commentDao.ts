import { comment } from "../types.js";

export interface CommentDao{
    createComment(comment: comment): void;
    deleteComment(id: string): void;
    listComments(postId: string): comment[];
}
