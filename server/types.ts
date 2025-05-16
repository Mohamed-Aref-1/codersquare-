import { RequestHandler } from "express";

export interface User{
    id: string;
    fname: string;
    lname: string;
    username: string;
    email: string;
    password: string;
}

export interface Post{
    id: string;
    title: string;
    url: string;
    userId: string;
    postedAt: string;
}

export interface Like{
    postId: string;
    userId: string;
    likedAt: string;
}

export interface Comment  {
    id: string;
    postId: string;
    userId: string;
    comment: string;
    commentedAt: string;
}


export type expressHandler<Request, Response> = RequestHandler<
any,
Partial<Response>,
Partial<Request>,
any
>;
 
