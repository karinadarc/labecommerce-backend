import { products } from "../database";
import { db } from "../database/knex";
import { TProduct } from "../types";


export const getAllProducts = async (): Promise<TProduct[]> => {
    const result = await db.raw(`SELECT * FROM  products`)
    return result
};

export const getProductsbyName = async (filter: string): Promise<TProduct[]> => {
    const result = await db.raw(`SELECT * FROM products WHERE name LIKE :filter`, { filter: `%${filter}%` });
    //const result = await db.raw(`SELECT * FROM products WHERE name LIKE ?`, [`%${filter}%`]);

    //const result = products.filter(product => product.name.toLowerCase().includes(name.toLowerCase()))
    return result
};

export const getProduct = async (id: string): Promise<TProduct | undefined> => {
    const [queryIdProduct] = await db.raw(`SELECT id FROM products WHERE id ="${id}"`) 
    return queryIdProduct
};

export const addProduct = async (newProduct: TProduct): Promise<void> => {
    await db.raw(`INSERT INTO products (id, name, price, description, image_url)
    VALUES (
        '${newProduct.id}',
            '${newProduct.name}',
            '${newProduct.price}',
            '${newProduct.description}',
            '${newProduct.imageUrl}'
    )
    `)

};

export const removeProduct = async (id: string) => {
  const result = await db.raw(`DELETE FROM products WHERE id='${id}'`)

    return result
};

export const saveProduct = async (product: TProduct, id:string) => {
    const result = await db.raw(`UPDATE products SET 
    id = '${product.id}',
    name = '${product.name}',
    price = '${product.price}',
    description = '${product.description}',
    imageUrl = '${product.imageUrl}'
    WHERE id = '${id}' `)
    
    return result
}