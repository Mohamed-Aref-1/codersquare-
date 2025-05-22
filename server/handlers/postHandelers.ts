import { initializeDb } from "../datastore/index.js";
import { Request, Response } from "express";
import { expressHandler, Post } from "../types.js";
import crypto from "crypto";
import {
  createPostRequest,
  createPostResponse,
  listPostsRequest,
  listPostsResponse,
} from "../api.js";
import { verifyJwt } from "../auth.js";

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
  if (!req.body.title) {
    res.status(400).send("Title is required");
    return;
  }

  if (!req.body.url) {
    res.status(400).send("URL is required");
    return;
  }

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).send("Unauthorized");
    return;
  }

  const payload = verifyJwt(token);
  if (!payload) {
    res.status(401).send("Unauthorized");
    return;
  }
  const userId = payload.UserId;
  console.log("userId", userId);

  const newPost: Post = {
    id: crypto.randomUUID(),
    title: req.body.title,
    url: req.body.url,
    userId: userId,
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
