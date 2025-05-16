import { Like } from "../../types.js";

export interface LikeDao{
    createLike(like: Like): Promise<void>;
    deleteLike(postId: string, userId: string): Promise<void>;
}
