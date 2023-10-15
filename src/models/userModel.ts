import { TUser } from "../types";
import { users } from "../database"


export const getUsers = (): TUser[] => {
    return users
};

export const getUser = (id: string): TUser | undefined => {
    return users.find((user) => user.id === id)
};

export const addUser = (newUser: TUser): void => {
    users.push(newUser)
};

export const removeUser = (id: string): boolean => {
    const indexToDelete = users.findIndex((user) => user.id === id)
    if (indexToDelete !== -1) {
        users.splice(indexToDelete, 1)
        return true
    }
    return false
}


    