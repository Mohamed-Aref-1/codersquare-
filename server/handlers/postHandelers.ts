import { initializeDb } from "../datastore/index.js";
import { Request, Response, RequestHandler } from "express";
import { expressHandler, Post } from "../types.js";
import crypto from "crypto";
import {
  createPostRequest,
  createPostResponse,
  listPostsRequest,
  listPostsResponse,
} from "../api.js";

const db = await initializeDb();

export const listPostsHandeler: expressHandler<listPostsRequest, listPostsResponse> = async (
  req: Request,
  res: Response
) => {
  const posts = await db.listPosts();
  res.send({ posts: posts }); 
};



export const createPostHandeler: expressHandler<createPostRequest, createPostResponse> = async (
  req: Request,
  res: Response
) => {
  const Post = req.body.post;
  if (!req.body.title) {
    res.status(400).send("Title is required");
    return;
  }

  if (!req.body.url) {
    res.status(400).send("URL is required");
    return;
  }
  if (!req.body.userId) {
    res.status(400).send("User ID is required");
    return;
  }

  const newPost: Post = {
    id: crypto.randomUUID(),
    title: req.body.title,
    url: req.body.url,
    userId: req.body.userId,
    postedAt: new Date().toISOString(),
  };

  try {
    await db.createPost(newPost);
    console.log("post created");
    res.status(200).send("Thanks for creating a post.");
  } catch (error: any) {
    if (error.message?.includes('UNIQUE constraint failed')) {
      res.status(400).send("A post with this URL already exists");
    } else {
      throw error; // Let the error handler handle other errors
    }
  }
};

// import { db } from "../datastore/index.js";
// import { Request, Response, RequestHandler } from "express";
// import { expressHandler, Post } from "../types.js";
// import crypto from "crypto";
// import {
//   createPostRequest,
//   createPostResponse,
//   listPostsRequest,
//   listPostsResponse,
// } from "../api.js";

// export const listPostsHandeler: expressHandler<listPostsRequest, listPostsResponse> = (
//   req: Request,
//   res: Response
// ) => {
//   const posts = db.listPosts();
//   res.send({ posts: posts }); 
// };

// export const createPostHandeler: expressHandler<createPostRequest, createPostResponse> = (
//   req: Request,
//   res: Response
// ) => {
//   const Post = req.body.post;
//   if (!req.body.title) {
//     res.status(400).send("Title is required");
//     return;
//   }

//   if (!req.body.url) {
//     res.status(400).send("URL is required");
//     return;
//   }
//   if (!req.body.userId) {
//     res.status(400).send("User ID is required");
//     return;
//   }

//   const newPost: Post = {
//     id: crypto.randomUUID(),
//     title: req.body.title,
//     url: req.body.url,
//     userId: req.body.userId,
//     postedAt: new Date().toISOString(),
//   };

//   db.createPost(newPost);
//   console.log("post created");
//   res.status(200).send("Thanks for creating a post.");
// };
