import { Post } from "./types.js";

export type listPostsRequest = {};
export type listPostsResponse = {
    posts: Post[];
}
export type createPostRequest = Pick<Post, "title" | "url" | "userId">;
export interface createPostResponse {}

export type getPostRequest = {};
export type getPostResponse = {
    post: Post;
}

export type deletePostRequest = {};
export type deletePostResponse = {};


