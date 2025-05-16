import { UserDao } from "./dao/UseDao.js";
import { PostDao } from "./dao/PostDao.js";
import { LikeDao } from "./dao/LikeDao.js";
import { CommentDao } from "./dao/commentDao.js";
import { inmMemoryDatastore } from "./memorydb/index.js";



export interface datastore extends UserDao, PostDao, LikeDao, CommentDao{}
export const db = new  inmMemoryDatastore();