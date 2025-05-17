import { Post , User} from "./types.js";

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





export type signupRequest = Pick<User, "email" | "fname" | "lname" |"username"| "password">;
export interface signupResponse {}



export interface signInRequest {
    login: string; // user name or email
    password: string;
}
export type signInResponse = Pick<User, "email" | "fname" | "lname" | "id" | "username">;

