import { Request, Response } from 'express'
import { addPurchase, getCompletePurchase, getPurchase, removePurchase } from '../models/purchaseModel'
import { getUser } from '../models/userModel'
import { TPurchase, TPurchaseById, TPurchases_products } from '../types'
import { getProduct } from '../models/productModel'


export const createPurchase = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.body.id
        const buyer = req.body.buyer
        let  total_price = 0

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

                const product = await getProduct(element.id)

                if (!product) {
                    res.statusCode = 409
                    throw new Error('O id do produto não existe');
                }

                if (typeof element.quantity !== 'number' || element.quantity <= 0) {
                    res.statusCode = 409
                    throw new Error('A quantidade deve ser maior que zero!');
                }

                total_price += product.price * element.quantity

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

export const deletePurchase = async (req: Request, res: Response): Promise<any> => {
    const id: string = req.params.id

    try {
        if (await getPurchase(id)) {
            await removePurchase(id)
            
            return res.status(200).send({ message:`O pedido ${id} foi cancelado com sucesso` }) 
         }
          throw new Error (`O pedido ${id} não existe!`)
        
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send('Erro inesperado!');
        }
    }
 
   
};


export const getPurchaseById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id: string = req.params.id;

        if (typeof id !== "string" || !id.startsWith('pur00')) {
            res.status(404).send('O ID deve ser uma string e iniciar com "pur00"');
            return;
        }

        const result = await getCompletePurchase(id)
        if( result){
            res.status(200).send(result)
            return
        }

    } catch (error) {
        res.status(500).send('Erro ao buscar a compra por ID');
    }
}
   
