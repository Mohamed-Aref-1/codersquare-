import 'dotenv/config';
import express from "express";
import { listPostsHandeler, createPostHandeler } from "./handlers/postHandelers.js";
import { signUpHandler, loginHandler } from "./handlers/AuthHandeler.js";
import asyncHandler from "express-async-handler";
import { initializeDb } from "./datastore/index.js";
import { requestloggermiddleware } from "./MiddleWare/loggerMIddleware.js";
import { errorMiddleware } from "./MiddleWare/errorMIddleware.js";
import dotenv from "dotenv";  
import { authMiddleware } from "./MiddleWare/authMiddleware.js";
import { rateLimitMiddleware } from "./MiddleWare/rateLimitMiddleware.js";
import { createCommentHandler, listCommentsHandler } from './handlers/commentHandler.js';
import { healthzHandler } from './handlers/healthHandler.js';
const app = express();

(async () => {
    await initializeDb();
    dotenv.config();

    app.use(express.json());
    app.use(requestloggermiddleware);

    // public endpoints
    app.post("/v1/signup", asyncHandler(signUpHandler));
    app.post("/v1/signin", asyncHandler(loginHandler));
    app.post("/v1/healthz", asyncHandler(healthzHandler));



    // protected endpoints
    app.use(authMiddleware);
    app.use(rateLimitMiddleware);

    app.get("/v1/posts", asyncHandler(listPostsHandeler));
    app.post("/v1/posts", asyncHandler(createPostHandeler));

    // comments endpoints
    app.post("/v1/comments", asyncHandler(createCommentHandler));
    app.get("/v1/comments", asyncHandler(listCommentsHandler));

    app.use(errorMiddleware);
    app.listen(process.env.PORT || 2000, () => {
        console.log(`Server is running on port ${process.env.PORT || 2000}`);
    });
})();
