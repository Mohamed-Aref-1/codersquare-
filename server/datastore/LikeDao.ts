import { Like } from "../types.js";

export interface LikeDao{
    createLike(like: Like): void;
    deleteLike(postId: string, userId: string): void;
}
