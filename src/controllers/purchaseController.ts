import { Request, Response } from 'express'
import { addPurchase, getPurchase, removePurchase } from '../models/purchaseModel'
import { getUser } from '../models/userModel'
import { TPurchase, TPurchases_products } from '../types'
import { getProduct } from '../models/productModel'


export const createPurchase = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.body.id
        const buyer = req.body.buyer
        const total_price = 0

        const products = req.body.products

        if (typeof id !== "string" || !id.startsWith('pur00')) {
            res.statusCode = 404
            throw new Error('O ID deve ser uma string e iniciar com "pur00"')
        }

        if (await getPurchase(id)) {
            res.statusCode = 409
            throw new Error('Este ID já está em uso.');
        }

        if (!await getUser(buyer)) {
            res.statusCode = 409
            throw new Error('Este usuário não existe!');
        }


        const newProducts: TPurchases_products[] = await Promise.all(
            products.map(async (element: { id: string, quantity: number }): Promise<TPurchases_products> => {

                if (!await getProduct(element.id)) {
                    res.statusCode = 409
                    throw new Error('O id do produto não existe');
                }

                if (typeof element.quantity !== 'number' || element.quantity <= 0) {
                    res.statusCode = 409
                    throw new Error('A quantidade deve ser maior que zero!');
                }

                return {
                    purchase_id: id,
                    product_id: element.id,
                    quantity: element.quantity
                }

            }))

        const purchase: TPurchase = {
            id,
            buyer,
            total_price,
        }
        console.log(newProducts)
        await addPurchase(purchase, newProducts);
        res.status(201).send('Pedido realizado com sucesso')


    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send('Erro inesperado!');
        }
    }
}

export const deletePurchase = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id
    
    let msnDelete = ``
 
    if (await getPurchase(id)) {
       await removePurchase(id)
        msnDelete = `O pedido ${id} foi deletado com sucesso`
    } else {  
        msnDelete = `O pedido ${id} não existe!`
    }
    res.status(200).send({ message: msnDelete })
};
