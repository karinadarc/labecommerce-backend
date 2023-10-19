import { TUser } from "../types";
import { users } from "../database"
import { db } from "../database/knex";


export const getUsers = async (): Promise<TUser[]> => {
    const result = await db.raw(`SELECT * FROM users`)
    return result
};

export const getUser = async (id: string): Promise<TUser | undefined> => {
    const [queryIdUser] = await db.raw(`SELECT id FROM users WHERE id ="${id}"`) 
    return queryIdUser
};

export const addUser = async (newUser: TUser): Promise<void> => {
    const result = await db.raw(`INSERT INTO users (id, name, email, password)
    VALUES('${newUser.id}',
        '${newUser.name}',
        '${newUser.email}',
        '${newUser.password}'
    )`)
};

export const removeUser = (id: string): boolean => {
    const indexToDelete = users.findIndex((user) => user.id === id)
    if (indexToDelete !== -1) {
        users.splice(indexToDelete, 1)
        return true
    }
    return false
}


    