import { users, products } from "./database"
import { TProduct, TUser } from "./types";
import express, { Request, Response } from 'express'
import cors from 'cors'
//------------------------------------------
//exercício 1
// console.table(users)
// console.table(produtos)



//variavel         //função
// const allUsers = getAllUsers();
// console.log(allUsers);

// const allProduct = getAllProducts();
// console.log(allProduct);


// console.table(searchUserByName(users, 'barbie'))
// console.table(searchProductsByName(products, 'tv Samsung'))

//---------------------------------------------------------------



export const createUser = (id: string, name: string, email: string, password: string): string => {
    const createdAt = new Date().toISOString()
    const newUser: TUser = { id, name, email, password, createdAt }
    users.push(newUser)
    return "Cadastro realizado com sucesso"

}

export const getAllUsers = (): TUser[] => users;

export function createProduct(id: string, name: string, price: number, description: string, imageUrl: string): string {
    const newProduct: TProduct = { id, name, price, description, imageUrl }
    products.push(newProduct)
    return "Produto criado com sucesso"
}

export function getAllProducts(): TProduct[] {
    return products
}

//---------------------------------------------------

export function searchUserByName(users: TUser[], nameInformado: string): TUser[] {
    const nomeLowerCase = nameInformado.toLowerCase()
    return users.filter((usuario) => usuario.name.toLowerCase() === nomeLowerCase)
}




export function searchProductsByName(produtos: TProduct[], nameInformado: string): TProduct[] {
    const nomeLowerCase = nameInformado.toLowerCase()
    return produtos.filter((produto) => produto.name.toLowerCase() === nomeLowerCase)
}


export const createUserResult = createUser("u003", "Barbie", "babii@email.com", "hellobarbie");
console.table(createUserResult)

//------------------------------------------------

export const createProductResult = createProduct("p003", "SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação.", "https://images.unsplash.com/photo");
console.table(createProductResult)

//---------------------------------------------------------------------------
const app = express()
app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log('Servidor rodando na porta 3003')
})

app.get('/ping', (req: Request, res: Response): void => {
    res.send('Pong!!')
})
//-------------------Aprofundamento express apis----------------
//getAllUsers
app.get('/users', (req: Request, res: Response): void => {
    try {
        const resultUsers: TUser[] = users
        if (!resultUsers) {
            res.statusCode = 404
            throw new Error('Usuários não encontrados!')
        }
        res.status(200).send(resultUsers)

    } catch (error) {
        console.log(error)
        if (error instanceof Error) {
            res.status(500).send(error.message)
        }

    }

})

//getAllProducts
// app.get('/products', (req:Request, res:Response):void =>{
//     const resultProducts: TProduct[] = products
//     res.status(200).send(resultProducts)
// })

//searchProductByName
app.get('/products', (req: Request, res: Response) => {
    const q: string = req.query.q as string
    const resultProducts: TProduct[] = products

    if (q !== undefined && q.length < 1) {
        return res.status(400).send('O campo de pesquisa deve possuir pelo menos um caractere')
    } if (!q) {
        return res.status(200).send(resultProducts)
    } else {
        const searchProducts: TProduct[] = products.filter(product => product.name.toLowerCase().includes(q.toLowerCase()))
        return res.status(200).send(searchProducts)
    }
})


//createUser
app.post('/users', (req: Request, res: Response): void => {
    console.log(req.body)
    try {
        const { id, name, email, password }: TUser = req.body
        if (typeof id !== "string" || !id.startsWith('u00')) {
            res.statusCode = 404
            throw new Error('O ID deve ser uma string e iniciar com "u00"')
        }
        if(users.some(user => user.id === id)){
            res.status(404).send('ID já em uso')
        }
        if (typeof name !== "string") {
            res.statusCode = 404
            throw new Error('O name precisa ser uma string')
        }
        if (typeof email !== "string") {
            res.statusCode = 404
            throw new Error('O e-mail precisa ser uma string')
        }
        if (typeof password !== "string" || password.length < 5) {
            res.statusCode = 404
            throw new Error('A senha precisa ser uma string e ter no mínimo 5 caracteres')
        }

        const newUser: TUser = {
            id,
            name,
            email,
            password,
            createdAt: new Date().toLocaleString()

        }
        users.push(newUser)
        res.status(201).send('Usúario cadastrado com sucesso')
    } catch (error) {
        console.log(error)
        if (error instanceof Error) {
            res.send(error.message)
        }
    }


})

//createProduct
app.post('/products', (req: Request, res: Response) => {
    try {
        const { id, name, price, description, imageUrl }: TProduct = req.body
        if (typeof id !== "string" || !id.startsWith('p00')) {
            res.statusCode = 404
            throw new Error('O ID deve ser uma string e iniciar com "p00"')

        }
        if (products.some(product => product.id === id)) {
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
        products.push(newProduct)
        res.status(201).send('Produto cadastrado com sucesso')
    } catch (error) {
        console.log(error)
        if (error instanceof Error) {
            res.send(error.message)
        }
    }

}
)

// aprodundamento express
// deleteUserById
app.delete("/users/:id", (req: Request, res: Response): void => {
    const id: string = req.params.id
    const indexToDelete = users.findIndex((user) => user.id === id)

    if (indexToDelete !== -1) {
        users.splice(indexToDelete, 1)
        res.status(200).send({ message: `O usuario ${id} foi deletado` })
    } else {
        res.status(200).send({ message: `O usuário ${id} não existe!` })
    }


})

app.delete("/products/:id", (req: Request, res: Response): void => {
    const id: string = req.params.id
    const indexToDelete = products.findIndex((product) => product.id === id)
    let msnDelete = `O produto ${id} foi deletado`

    if (indexToDelete !== -1) {
        products.splice(indexToDelete, 1)
    } else {
        msnDelete = `O produto ${id} não existe!`
    }
    res.status(200).send({ message: msnDelete })

})

app.put("/products/:id", (req: Request, res: Response) => {
    const id: string = req.params.id
    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const newDescription = req.body.description as string | undefined
    const newImageURL = req.body.imageUrl as string | undefined

    const product = products.find((product) => product.id === id)

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

    res.status(200).send({ message: "O produto foi alterado com sucesso" })

})