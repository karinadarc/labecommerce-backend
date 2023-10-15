import { products } from "../database";
import { TProduct } from "../types";


export const getAllProducts = (): TProduct[] =>{
    return products
};

export const getProductsbyName = (name:string):TProduct[] =>{
   const result = products.filter(product => product.name.toLowerCase().includes(name.toLowerCase()))
   return result
};

export const getProduct = (id:string):TProduct | undefined =>{
    return products.find((product)=> product.id === id)
};

export const addProduct = (newProduct:TProduct): void =>{
    products.push(newProduct)
};

export const removeProduct = (id:string): boolean =>{
    const indexToDelete = products.findIndex((product) => product.id === id)
    if (indexToDelete !== -1) {
        products.splice(indexToDelete, 1)
        return true
    }
    return false
};

export const saveProduct = (product:TProduct) =>{
    console.log('produto Atualizado!')
}