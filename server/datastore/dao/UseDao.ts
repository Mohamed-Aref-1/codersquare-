// Data Access Object to read some data from the database to memory

import { User } from "../../types.js";

export interface UserDao{
    createUser(user: User): Promise<void>;
    getUserByEmail(email: string): Promise<User | undefined>; 
    getUserByUsername(username: string): Promise<User | undefined>;


}
