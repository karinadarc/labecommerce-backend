import { Request, Response } from 'express'
import { TProduct } from "../types";
import { addProduct, getAllProducts, getProduct, getProductsbyName, removeProduct, saveProduct } from '../models/productModel';


export const getProducts = async (req: Request, res: Response) => {
    const name: string = req.query.name as string

    if (name !== undefined && name.length < 1) {
        return res.status(400).send({ message: 'O campo de pesquisa deve possuir pelo menos um caractere'})
    }
    if (!name) {
        const allProducts = await getAllProducts()
        return res.status(200).send(allProducts)
    } else {
        const searchProducts: TProduct[] = await getProductsbyName(name)
        return res.status(200).send(searchProducts)
    }
};


export const createProduct = async (req: Request, res: Response) => {
    try {
        const { id, name, price, description, imageUrl }: TProduct = req.body
        if (typeof id !== "string" || !id.startsWith('p00')) {
            res.statusCode = 404
            throw new Error('O ID deve ser uma string e iniciar com p00')

        }
        if (await getProduct(id)) {
            res.statusCode = 409
            throw new Error('Este ID já está em uso. Escolha um ID único.');
        }
        if (typeof name !== "string") {
            res.statusCode = 404
            throw new Error('O name precisa ser uma string')
        }
        if (typeof price !== "number") {
            res.statusCode = 404
            throw new Error('O price precisa ter um valor numérico')
        }
        if (typeof description !== "string") {
            res.statusCode = 404
            throw new Error('A description deve ser uma string')
        }
        if (typeof imageUrl !== "string") {
            res.statusCode = 404
            throw new Error('O link da imageUrl deve ser uma string')
        }
        const newProduct: TProduct = {
            id,
            name,
            price,
            description,
            imageUrl
        }
        await addProduct(newProduct)
        res.status(201).send({message: 'Produto cadastrado com sucesso'})
    } catch (error) {
        //console.log(error)
        if (error instanceof Error) {
            res.send({message: error.message})
        }
    }

};

export const deleteProduct = async (req: Request, res: Response): Promise<any> => {
    const id: string = req.params.id

    try {
        if (await getProduct(id)) {
            await removeProduct(id)

            return res.status(200).send({ message: `O produto ${id} foi deletado.` })
        }

        return res.status(404).send({message:`O produto ${id} não existe!`})

    } catch (error) {

        if (error instanceof Error) {
            res.send({message: error.message})
        } else {
            res.send({message:'Erro inesperado!'});
        }
    }
};


export const updateProduct = async (req: Request, res: Response) => {
    const id: string = req.params.id
    const newId = req.body.id as string | undefined
    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const newDescription = req.body.description as string | undefined
    const newImageURL = req.body.imageUrl as string | undefined

    const product = await getProduct(id)

    if (!product) {
        return res.status(409).send({ message: "Produto não encontrado" });
    }
    if (newId !== undefined) {
        if (await getProduct(newId)) {
            return res.status(404).send({ message: `O '${newId} já está em uso!'` });
        }
        product.id = newId;
    }
   
    if(newId !== undefined){
        if (typeof newId !== "string" || !newId.startsWith('p00')) {
            return res.status(409).send({ message:'O ID deve ser uma string e iniciar com p00' });
        }
    }

    if (typeof newName !== "string") {
        return res.status(409).send({ message: 'O name precisa ser uma string' });
    }
    if (typeof newPrice !== "number") {
        return res.status(409).send({message:'O price precisa ter um valor numérico'});
    }
    if (typeof newDescription !== "string") {
        return res.status(409).send({message:'A description deve ser uma string'});
    }
    if (typeof newImageURL !== "string") {
        return res.status(409).send({message:'O link da imageUrl deve ser uma string'});
       
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

    await saveProduct(product, id)

    res.status(200).send({ message: "Produto atualizado com sucesso" })

};
