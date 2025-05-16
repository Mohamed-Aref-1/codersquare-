import express, { ErrorRequestHandler, RequestHandler } from "express";
import { listPostsHandeler, createPostHandeler } from "./handlers/postHandelers.js";
import asyncHandler from "express-async-handler";
const app = express();

// parse json bodies in the request to make express understand it
app.use(express.json());

// middleware to log requests

// middleware is a function that has access to the request, response, and next function
// you can use it to do something with the request or response before it reaches the route handler
// or after it reaches the route handler
const requestloggermiddleware: RequestHandler = (req, res, next) => {
  console.log(req.method, req.path, "- body: ", req.body);
  next();
};

app.use(requestloggermiddleware);

// use the middleware to log requests
// this will log all requests to the server before they reach the route handler

// this is a route handler for the GET request to the /posts path
// it will send the posts array as a response to the client
app.get("/v1/posts", asyncHandler(listPostsHandeler));

// this is a route handler for the POST request to the /posts path
// it will add a new post to the posts array
// and send a 200 status code to the client
app.post("/v1/posts", asyncHandler(createPostHandeler));

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
};

app.use(errorHandler);

app.listen(2000, () => {
  console.log("Server is running on port 2000");
});
