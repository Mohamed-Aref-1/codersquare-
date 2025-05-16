// Data Access Object to read some data from the database to memory

import { User } from "../types.js";

export interface UserDao{
    createUser(user: User): void;
    getUserByEmial(email: string): User | undefined;
    getUserByUsername(id: string): User | undefined;

}
