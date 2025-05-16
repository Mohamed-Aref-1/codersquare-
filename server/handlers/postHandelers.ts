import { db } from "../datastore/index.js";
import { Request, Response, RequestHandler } from "express";
import { Post } from "../types.js";
import crypto from "crypto";

export type expressHandler<Request, Response> = RequestHandler<
any,
Partial<Response>,
Partial<Request>,
any
>;

export const listPostsHandeler: expressHandler<{}, {posts: Post[]}> = (req: Request, res: Response) => {
    const posts = db.listPosts();
    res.send({posts: posts});
}


export const createPostHandeler: expressHandler<createPostRequest, createPostResponse> = (req: Request, res: Response) => {
const Post = req.body.post;
if (!req.body.title || !req.body.url || !req.body.userId) {
    res.status(400).send("Post is required");
    return;
}

const newPost: Post ={
id: crypto.randomUUID(),
title: req.body.title,
url: req.body.url,
userId: req.body.userId,
postedAt: new Date().toISOString()}


db.createPost(newPost);
console.log("post created");
res.status(200).send("Thanks for creating a post.");
}

type createPostRequest = Pick<Post, "title" | "url" | "userId">;
interface createPostResponse {}
