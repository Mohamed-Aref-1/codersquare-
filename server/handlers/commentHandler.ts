import { initializeDb } from "../datastore/index.js";
import { Request, Response } from "express";
import { expressHandler, Comment } from "../types.js";
import crypto from "crypto";
import {
    listCommentsRequest,
    listCommentsResponse,
    createCommentRequest,
    createCommentResponse,
} from "../api.js";

const db = await initializeDb();

export const createCommentHandler: expressHandler<createCommentRequest, createCommentResponse> = async (
  req: Request,
  res: Response
) => {
  if (!req.body.postId || !req.body.userId || !req.body.comment) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }
  const { postId, userId, comment: commentText } = req.body;

  const newComment: Comment = {
    id: crypto.randomUUID(),
    postId,
    userId,
    comment: commentText,
    commentedAt: new Date().toISOString()
  };

  try {
    await db.createComment(newComment);
    console.log("comment created");
    res.status(201).json({ comment: newComment });
  } catch (error: any) {
    if (error.message?.includes('UNIQUE constraint failed')) {
      res.status(400).json({ error: "A comment with this postId and userId already exists" });
    } else {
      res.status(500).json({ error: "Failed to create comment" });
    }
  }
};

export const listCommentsHandler: expressHandler<listCommentsRequest, listCommentsResponse> = async (
  req: Request,
  res: Response
) => {

    const comments = await db.listComments();
    res.status(200).json({ comments });
};

