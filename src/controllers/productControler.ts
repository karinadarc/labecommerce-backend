import { Request, Response } from 'express'
import { TProduct } from "../types";
import { products } from "../database"
import { addProduct, getAllProducts, getProduct, getProductsbyName, removeProduct, saveProduct } from '../models/productModel';

export const getProducts = (req: Request, res: Response) => {
    const name: string = req.query.name as string

    if (name !== undefined && name.length < 1) {
        return res.status(400).send('O campo de pesquisa deve possuir pelo menos um caractere')
    }
    if (!name) {
        const allProducts = getAllProducts()
        return res.status(200).send(allProducts)
    } else {
        const searchProducts: TProduct[] = getProductsbyName(name)
        return res.status(200).send(searchProducts)
    }
};


export const createProduct = (req: Request, res: Response) => {
    try {
        const { id, name, price, description, imageUrl }: TProduct = req.body
        if (typeof id !== "string" || !id.startsWith('p00')) {
            res.statusCode = 404
            throw new Error('O ID deve ser uma string e iniciar com "p00"')

        }
        if (getProduct(id)) {
            res.status(409).send('Este ID já está em uso. Escolha um ID único.');
        }
        if (typeof name !== "string") {
            res.statusCode = 404
            throw new Error('O name precisa ser uma string')
        }
        if (typeof price !== "number") {
            res.statusCode = 404
            throw new Error('O preço precisa ser uma number')
        }
        if (typeof description !== "string") {
            res.statusCode = 404
            throw new Error('A descrição deve ser uma string')
        }
        if (typeof imageUrl !== "string") {
            res.statusCode = 404
            throw new Error('O link da imagem deve ser uma string')
        }
        const newProduct: TProduct = {
            id,
            name,
            price,
            description,
            imageUrl
        }
        addProduct(newProduct)
        res.status(201).send('Produto cadastrado com sucesso')
    } catch (error) {
        console.log(error)
        if (error instanceof Error) {
            res.send(error.message)
        }
    }

};

export const deleteProduct = (req: Request, res: Response): void => {
    const id: string = req.params.id
    let msnDelete = ``

    if (removeProduct(id)) {
        msnDelete = `O produto ${id} foi deletado`
    } else {
        msnDelete = `O produto ${id} não existe!`
    }
    res.status(200).send({ message: msnDelete })
};


export const updateProduct = (req: Request, res: Response) => {
    const id: string = req.params.id
    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const newDescription = req.body.description as string | undefined
    const newImageURL = req.body.imageUrl as string | undefined

    const product = getProduct(id)

    if (!product) {
        return res.status(404).send({ message: "Produto não encontrado" });
    }

    if (newName !== undefined) {
        product.name = newName;
    }
    if (newPrice !== undefined) {
        product.price = newPrice;
    }
    if (newDescription !== undefined) {
        product.description = newDescription;
    }
    if (newImageURL !== undefined) {
        product.imageUrl = newImageURL;
    }

    saveProduct(product)

    res.status(200).send({ message: "O produto foi alterado com sucesso" })

};
