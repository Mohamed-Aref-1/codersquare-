import { UserDao } from "./dao/UseDao.js";
import { PostDao } from "./dao/PostDao.js";
import { LikeDao } from "./dao/LikeDao.js";
import { CommentDao } from "./dao/commentDao.js";
import { inmMemoryDatastore } from "./memorydb/index.js";
import { sqlDatastore } from "./sql/index.js";



export interface datastore extends UserDao, PostDao, LikeDao, CommentDao{}

// here we made the initialization and declaration in two different steps so that 
// we can use the same instance of the database in the whole application
// any one who want to use the data base should call the initializeDb function
let db: datastore;

export async function initializeDb(){
    if(!db){
        db = await new sqlDatastore().openDb();
    }
    return db;
}

