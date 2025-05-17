-- Up
-- Note: SQLite doesn't have VARCHAR - it uses TEXT type which is more flexible
-- TEXT in SQLite is dynamic length and can store up to 1 billion bytes
-- TEXT is equivalent to VARCHAR in other SQL databases but more efficient in SQLite
-- SQLite will automatically optimize storage regardless of type declaration
CREATE TABLE Users (
    id TEXT PRIMARY KEY,
    fname TEXT NOT NULL,
    lname TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE Posts (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    url TEXT UNIQUE NOT NULL,
    userId TEXT NOT NULL,
    postedAt TEXT NOT NULL,
    FOREIGN KEY (userId) REFERENCES Users(id)
);

CREATE TABLE Likes (
    postId TEXT NOT NULL,
    userId TEXT NOT NULL,
    likedAt TEXT NOT NULL,
    PRIMARY KEY (postId, userId),
    FOREIGN KEY (postId) REFERENCES Posts(id),
    FOREIGN KEY (userId) REFERENCES Users(id)
);
    
CREATE TABLE Comments (
    id TEXT PRIMARY KEY,
    postId TEXT NOT NULL,
    userId TEXT NOT NULL,
    comment TEXT NOT NULL,
    commentedAt TEXT NOT NULL,
    FOREIGN KEY (postId) REFERENCES Posts(id),
    FOREIGN KEY (userId) REFERENCES Users(id)
);

-- Down
-- DROP TABLE Comments;
-- DROP TABLE Likes;
-- DROP TABLE Posts;
-- DROP TABLE Users;

