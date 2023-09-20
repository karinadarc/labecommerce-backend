import { users, products, createUser, getAllUsers, getAllProducts, createProduct, searchUserByName, searchProductsByName } from "./database"
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
// console.table(searchProductsByName(produtos, 'tv Samsung'))

//---------------------------------------------------------------
const app = express()
app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log('Servidor rodando na porta 3003')
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!!')
})

//--------------------------------------------------------------
//getAllUsers
app.get('/users', (req: Request, res: Response) => {
    const resultUsers: TUser[] = users
    res.status(200).send(resultUsers)
})

//getAllProducts
// app.get('/products', (req:Request, res:Response)=>{
//     const resultProducts: TProduct[] = products
//     res.status(200).send(resultProducts)
// })

//searchProductByName
app.get('/products', (req: Request, res: Response) => {
    const q: string = req.query.q as string
    const resultProducts: TProduct[] = products

    if (!q) {
        return res.status(200).send(resultProducts)
    } else {
        const searchProducts: TProduct[] = products.filter(product => product.name.toLowerCase().includes(q.toLowerCase()))
        return res.status(200).send(searchProducts)
    }
})


//createUser
app.post('/users', (req: Request, res: Response) => {
    console.log(req.body)
    const { id, name, email, password }: TUser = req.body
    const newUser: TUser = {
        id,
        name,
        email,
        password,
        createdAt: new Date().toLocaleString()
    }
    users.push(newUser)
    res.status(201).send('Usúario cadastrado com sucesso')
})

//createProduct
app.post('/products', (req: Request, res: Response) => {
    const { id, name, price, description, imageUrl }: TProduct = req.body
    const newProduct: TProduct = {
        id,
        name,
        price,
        description,
        imageUrl
    }
    products.push(newProduct)
    res.status(201).send('Produto cadastrado com sucesso')
}
)

// aprodundamento express
// deleteUserById
app.delete("/users/:id", (req: Request, res: Response) => {
    const id = req.params.id
    const indexToDelete = users.findIndex((user) => user.id === id)
    let msnDelete = `O usuario ${id} foi deletado`

    if (indexToDelete !== -1) {
        users.splice(indexToDelete, 1)
    } else {
        msnDelete = `O usuário ${id} não existe!`
    }
    res.status(200).send({ message: msnDelete })

})

app.delete("/products/:id", (req: Request, res: Response) => {
    const id = req.params.id
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
    const id = req.params.id
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