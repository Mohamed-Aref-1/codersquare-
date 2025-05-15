// Data Access Object to read some data from the database to memory

import { user } from "../types.js";

export interface UserDao{
    createUser(user: user): void;
    getUserByEmial(email: string): user | undefined;
    getUserByUsername(id: string): user | undefined;

}
