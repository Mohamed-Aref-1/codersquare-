import express, { RequestHandler } from "express";
const app = express();

// parse json bodies in the request to make express understand it
app.use(express.json());

// in memory array to store posts (volatile)
const posts: any[] = [];

// middleware to log requests
// middleware is a function that has access to the request, response, and next function
// you can use it to do something with the request or response before it reaches the route handler
// or after it reaches the route handler
const requestloggermiddleware : RequestHandler = (req, res, next) => {
    console.log('New Request received: ', req.method, req.path,'- body: ' , req.body);
    next();
}


app.use(requestloggermiddleware);
app.use((req, res, next) => {
console.log( new Date().toISOString());
next();
})
// use the middleware to log requests
// this will log all requests to the server before they reach the route handler
app.use(requestloggermiddleware);


// this is a route handler for the GET request to the /posts path
// it will send the posts array as a response to the client
app.get("/posts", (req, res) => {
    res.send(posts);
});

// this is a route handler for the POST request to the /posts path
// it will add a new post to the posts array
// and send a 200 status code to the client
app.post("/posts" , (req, res) => {
    const post = req.body;
    posts.push(post);
    res.sendStatus(200);
});

// this will start the server on port 2000
// and log a message to the console when the server is running
app.listen(2000, () => {
    console.log("Server is running on port 2000");
});