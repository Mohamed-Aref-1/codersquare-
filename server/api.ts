import { Post , User, Comment} from "./types.js";

export type listPostsRequest = {};
export type listPostsResponse = {
    posts: Post[];
}
export type createPostRequest = Pick<Post, "title" | "url">;
export interface createPostResponse {}

export type getPostRequest = {};
export type getPostResponse = {
    post: Post;
}



export type signupRequest = Pick<User, "email" | "fname" | "lname" |"username"| "password">;
export interface signupResponse {
    jwt: string;
}



export interface signInRequest {
    login: string; // user name or email
    password: string;
}
export type signInResponse = 
{   user: Pick<User, "email" | "fname" | "lname" | "id" | "username">;
    jwt: string;
}

export type createCommentRequest = Pick<Comment, "postId" | "userId" | "comment">;
export interface createCommentResponse {
}

export type listCommentsRequest = {};
export type listCommentsResponse = {
    comments: Comment[];
}

