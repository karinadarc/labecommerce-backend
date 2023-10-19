import { db } from "../database/knex";
import { TPurchase, TPurchases_products } from "../types";


export const addPurchase = async (newPurchase: TPurchase, products: TPurchases_products[]): Promise<void> => {
    const result = await db.raw(`INSERT INTO purchases (id, buyer, total_price)
    VALUES('${newPurchase.id}',
        '${newPurchase.buyer}',
        '${newPurchase.total_price}'
    )`)

    //await db.insert(newPurchase).into('purchases')

    // if (products) {
    //     let insertProducts = `INSERT INTO purchases_products
    //     (purchase_id, product_id, quantity) VALUES `;
    //     let values: string[] = [];
    
    //     products.forEach(async (product) => {
    //         values.push(`('${product.purchase_id}', '${product.product_id}', ${product.quantity})`) 
    //     }) 

    //     insertProducts += values.join();
    //     await db.raw(insertProducts);
    // }
    

    await db.batchInsert('purchases_products', products);
};

export const getPurchase = async (id:string): Promise<TPurchase | undefined> =>{
    const [verifyId] = await db.raw(`SELECT id FROM purchases WHERE id ='${id}'`)
    return verifyId
};

export const removePurchase = async (id: string) => {
    const result = await db.raw(`DELETE FROM purchases WHERE id='${id}'`)
  
      return result
  };