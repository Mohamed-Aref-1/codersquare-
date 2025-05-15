import { like } from "../types.js";

export interface LikeDao{
    createLike(like: like): void;
    deleteLike(postId: string, userId: string): void;
}
