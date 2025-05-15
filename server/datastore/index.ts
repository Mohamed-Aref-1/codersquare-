import { UserDao } from "./UseDao.js";
import { PostDao } from "./PostDao.js";
import { LikeDao } from "./LikeDao.js";
import { CommentDao } from "./commentDao.js";
import { inmMemoryDatastore } from "./memorydb/index.js";
export interface datastore extends UserDao, PostDao, LikeDao, CommentDao{}


export const db = new inmMemoryDatastore();