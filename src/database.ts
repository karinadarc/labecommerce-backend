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

export const products: TProduct[] = [
    {
        id: 'p001',
        name: 'Tv Samsung',
        price: 2000.00,
        description: 'Monitor Led Full HD 24 polegadas',
        imageUrl: "https://picsum.photos/id/237/200/300"

    },
    {
        id: 'p002',
        name: 'Notbook Samsung',
        price: 1500.00,
        description: 'Notbook - 8gb memória ',
        imageUrl: "https://picsum.photos/id/237/200/300"

    }

]

//-------------------------------------------------------






