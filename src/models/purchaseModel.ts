import { db } from "../database/knex";
import { TProductsInPurchases, TPurchase, TPurchaseById, TPurchases_products } from "../types";


export const addPurchase = async (newPurchase: TPurchase, products: TPurchases_products[]): Promise<void> => {
    await db.insert(newPurchase).into('purchases')
    await db.batchInsert('purchases_products', products);
    //                     tabela               valor
};

export const getPurchase = async (id:string): Promise<TPurchase | undefined> =>{
    const [verifyId] = await db.raw(`SELECT id FROM purchases WHERE id ='${id}'`)
    return verifyId
};

export const removePurchase = async (id: string) => {
    await db.delete().from("purchases").where({ id:id})
  };

export const getCompletePurchase = async (id:string): Promise<TPurchaseById | undefined> =>{
    const [result]  = await db.select(
        'purchases.id as purchaseId', 
        'users.id as buyerId', 
        'users.name as buyerName', 
        'users.email as buyerEmail', 
        'purchases.total_price as totalPrice', 
        'purchases.created_at as createdAt')
        .from('purchases')
        .join('users','users.id','purchases.buyer')
        .where('purchases.id',id) as TPurchaseById[]

    const products = await db.select(
        'products.id as id',
        'products.name as name',
        'products.price as price',
        'products.description as description',
        'products.image_url as imageUrl',
        'purchases_products.quantity as quantity')
        .from('products')
        .join('purchases_products', 'purchases_products.product_id','products.id')
        .where('purchase_id',id) as TProductsInPurchases[]

    result.products = products

    return result
}