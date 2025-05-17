import express, { ErrorRequestHandler, RequestHandler } from "express";
import { listPostsHandeler, createPostHandeler } from "./handlers/postHandelers.js";
import { signUpHandler, loginHandler } from "./handlers/UserHandeler.js";
import asyncHandler from "express-async-handler";
import { initializeDb } from "./datastore/index.js";
const app = express();



(async () => {
await initializeDb();

app.use(express.json());



const requestloggermiddleware: RequestHandler = (req, res, next) => {
  console.log(req.method, req.path, "- body: ", req.body);
  next();
};

app.use(requestloggermiddleware);


app.get("/v1/posts", asyncHandler(listPostsHandeler));
app.post("/v1/posts", asyncHandler(createPostHandeler));
app.post("/v1/signup", asyncHandler(signUpHandler));
app.post("/v1/signin", asyncHandler(loginHandler));

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
};

app.use(errorHandler);

app.listen(2000, () => {
  console.log("Server is running on port 2000");
});
})();
