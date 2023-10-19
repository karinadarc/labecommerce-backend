import cors from 'cors';
import express, { Request, Response } from 'express';
import productRouter from "./routes/productRouter";
import userRouter from "./routes/userRouter";
import purchaseRouter from './routes/purchaseRouter';

const app = express()
app.use(cors())
app.use(express.json())

app.use('/users', userRouter)
app.use('/products', productRouter)
app.use('/purchases', purchaseRouter )

app.get('/ping', (req: Request, res: Response): void => {
    res.send('Pong!!')
})

app.listen(3003, () => {
    console.log('Servidor rodando na porta 3003')
})

