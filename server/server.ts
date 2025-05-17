import express, { ErrorRequestHandler, RequestHandler } from "express";
import { listPostsHandeler, createPostHandeler } from "./handlers/postHandelers.js";
import { signUpHandler, loginHandler } from "./handlers/AuthHandeler.js";
import asyncHandler from "express-async-handler";
import { initializeDb } from "./datastore/index.js";
import { requestloggermiddleware } from "./MiddleWare/loggerMIddleware.js";
import { errorMiddleware } from "./MiddleWare/errorMIddleware.js";
const app = express();



(async () => {
await initializeDb();
app.use(express.json());




app.use(requestloggermiddleware);


app.get("/v1/posts", asyncHandler(listPostsHandeler));
app.post("/v1/posts", asyncHandler(createPostHandeler));
app.post("/v1/signup", asyncHandler(signUpHandler));
app.post("/v1/signin", asyncHandler(loginHandler));



app.use(errorMiddleware);

app.listen(2000, () => {
  console.log("Server is running on port 2000");
});
})();
