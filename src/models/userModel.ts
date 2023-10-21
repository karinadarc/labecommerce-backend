import { TUser } from "../types";
import { db } from "../database/knex";


export const getUsers = async (): Promise<TUser[]> => {
    const [result] = await db("users")
    return result
};

export const getUser = async (id: string): Promise<TUser | undefined> => {
    // const [queryIdUser] = await db.raw(`SELECT id FROM users WHERE id ="${id}"`) 
    // return queryIdUser

    const [ user ] = await db.select("*").from("users").where({ id:id })
    return user
};

export const addUser = async (newUser: TUser): Promise<void> => {
    // const result = await db.raw(`INSERT INTO users (id, name, email, password)
    // VALUES('${newUser.id}',
    //     '${newUser.name}',
    //     '${newUser.email}',
    //     '${newUser.password}'
    // )`)

    await db("users").insert(newUser)
};

export const removeUser = async (id: string):Promise<void>  => {
   // await db.raw(`DELETE FROM users WHERE id='${id}'`)

   await db.delete().from("users").where({ id:id})
}


    