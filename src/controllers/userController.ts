import { Request, Response } from 'express'
import { TUser } from "../types";
import { addUser, getUser, getUsers, removeUser } from '../models/userModel';


export const getAllUsers = (req: Request, res: Response): void => {
    try {
        const resultUsers: TUser[] = getUsers()
        if (!resultUsers) {
            res.statusCode = 404
            throw new Error('Usuários não encontrados!')
        }
        res.status(200).send(resultUsers)

    } catch (error) {
        console.log(error)
        if (error instanceof Error) {
            res.status(500).send(error.message)
        }

    }
};


export const createUser = (req: Request, res: Response): void => {
    console.log(req.body)
    try {
        const { id, name, email, password }: TUser = req.body
        if (typeof id !== "string" || !id.startsWith('u00')) {
            res.statusCode = 400
            throw new Error('O ID deve ser uma string e iniciar com "u00"')
        }
        if (getUser(id)) {
            res.status(400).send('ID já em uso')
        }
        if (typeof name !== "string") {
            res.statusCode = 400
            throw new Error('O name precisa ser uma string')
        }
        if (typeof email !== "string") {
            res.statusCode = 400
            throw new Error('O e-mail precisa ser uma string')
        }
        if (typeof password !== "string" || password.length < 5) {
            res.statusCode = 400
            throw new Error('A senha precisa ser uma string e ter no mínimo 5 caracteres')
        }

        const newUser: TUser = {
            id,
            name,
            email,
            password,
            createdAt: new Date().toLocaleString()
        }

        addUser(newUser)
        res.status(201).send('Usuário cadastrado com sucesso')
    } catch (error) {
        console.log(error)
        if (error instanceof Error) {
            res.send(error.message)
        }
    }


};


export const deleteUser = (req: Request, res: Response): void => {
    const id: string = req.params.id

    if (removeUser(id)) {
        res.status(200).send({ message: `O usuario ${id} foi deletado` })
    } else {
        res.status(200).send({ message: `O usuário ${id} não existe!` })
    }
}

