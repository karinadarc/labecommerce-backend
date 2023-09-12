import { TUser, TProduct } from "./types"

export const users: TUser[] = [
    {
        id: 'u001',
        name: 'Lily',
        email: 'lily@gmail.com',
        password: 'abcdef00',
        createdAt: new Date().toISOString(),
    },
    {
        id: 'u002',
        name: 'Ryle',
        email: 'ryle@gmail.com',
        password: 'abcdef00',
        createdAt: new Date().toISOString(),
    }
]

//timestamp tem haver com data

export const produtos: TProduct[] = [
    {
        id: 'tv001',
        name: 'Tv Samsung',
        price: 2000.00,
        description: 'Monitor Led Full HD 24 polegadas',
        imageUrl: "https://picsum.photos/id/237/200/300"

    },
    {
        id: 'pc001',
        name: 'Notbook Samsung',
        price: 1500.00,
        description: 'Notbook - 8gb memória ',
        imageUrl: "https://picsum.photos/id/237/200/300"

    }

]

//---------------------------------------------------------------------------------------------------------------
export const createUser = (id: string, name: string, email: string, password: string): string => {
    const createdAt = new Date().toISOString()
    const newUser: TUser = { id, name, email, password, createdAt }
    users.push(newUser)
    return "Cadastro realizado com sucesso"

}
export const getAllUsers = (): TUser[] => users;



export function createProduct(id: string, name: string, price: number, description: string, imageUrl: string): string {
    const newProduct: TProduct = { id, name, price, description, imageUrl }
    produtos.push(newProduct)
    return "Produto criado com sucesso"
}
export function getAllProducts(): TProduct[] {
    return produtos
} 

//----------------------------------------------------------------------------------------------------------------

export function searchUserByName(users: TUser[], nameInformado: string): TUser[] {
    const nomeLowerCase = nameInformado.toLowerCase()
    return users.filter((usuario) => usuario.name.toLowerCase() === nomeLowerCase)
}




export function searchProductsByName(produtos: TProduct[], nameInformado: string): TProduct[] {
    const nomeLowerCase = nameInformado.toLowerCase()
    return produtos.filter((produto) => produto.name.toLowerCase() === nomeLowerCase)
}


//-----------------------------------------------------------------------------------------------

export const createUserResult = createUser("u003", "Barbie", "babii@email.com", "hellobarbie");
console.table(createUserResult)

//------------------------------------------------

export const createProductResult = createProduct("prod003", "SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação.", "https://images.unsplash.com/photo");
console.table(createProductResult)


