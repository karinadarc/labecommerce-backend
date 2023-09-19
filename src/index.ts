import { users, products, createUser, getAllUsers, getAllProducts, createProduct, searchUserByName, searchProductsByName } from "./database"
import { TProduct, TUser } from "./types";
import express, {Request, Response} from 'express'
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

app.listen(3003,()=>{
    console.log('Servidor rodando na porta 3003')
})

app.get('/ping', (req:Request, res:Response)=>{
    res.send('Pong!!')
})

//--------------------------------------------------------------
//getAllUsers
app.get('/users', (req:Request, res:Response)=>{
    const resultUsers: TUser[] = users
    res.status(200).send(resultUsers)
})

//getAllProducts
// app.get('/products', (req:Request, res:Response)=>{
//     const resultProducts: TProduct[] = products
//     res.status(200).send(resultProducts)
// })

//searchProductByName
app.get('/products', (req:Request, res:Response)=>{
    const q: string = req.query.q as string
    const resultProducts: TProduct[] = products

    if(!q){
        return res.status(200).send(resultProducts)
    }else{
        const searchProducts: TProduct[] = products.filter(product => product.name.toLowerCase().includes(q.toLowerCase()))
        return res.status(200).send(searchProducts)
    }
})


//createUser
app.post('/users', (req:Request, res:Response)=>{
    console.log(req.body)
    const {id,name,email,password}: TUser = req.body 
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
app.post('/products',(req:Request, res:Response)=>{
    const {id,name,price,description,imageUrl}: TProduct = req.body
    const newProduct: TProduct ={
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