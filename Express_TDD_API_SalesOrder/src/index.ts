import express from 'express'
import salesOrderRouter from './application/routes/SalesOrder.routes'
import clientRouter from './application/routes/Client.routes'
import productRouter from './application/routes/Product.routes'
import { errorMiddleware } from './application/middlewares/Error.middleware'

const app = express()

app.use(express.json())

app.use('/orders', salesOrderRouter)
app.use('/clients', clientRouter)
app.use('/products', productRouter)

app.use(errorMiddleware)

const PORT = process.env.PORT || 3000
app.listen(+PORT, () => {
    console.log(`API running at: http://localhost:${PORT}`)
})
