import { Request, Response } from "express"
import { Config } from "../../main"
import { InsertRequest, UpdateRequest, Validator } from "../middlewares/Validator"
import { AddProduct } from "../useCases/AddProduct"
import { DeleteProduct } from "../useCases/DeleteProduct"
import { GetProduct } from "../useCases/GetProduct"
import { ListProducts } from "../useCases/ListProducts"
import { UpdateProduct } from "../useCases/UpdateProduct"

export class AppController {
    start({ app, services }: Config) {
        app.get('/prd', Validator.getProduct, async (req: Request, res: Response) => {
            try {
                const { id } = req.query
                const get = new GetProduct(services.productRepository)
                const product = await get.exec(id)
                res.json(product)
            } catch (err) {
                res.json({ error: err.message })
            }
        })
        app.get('/prd/list', async (req: Request, res: Response) => {
            try {
                const list = new ListProducts(services.productRepository)
                const products = await list.exec()
                res.json(products)
            } catch (err) {
                res.json({ error: err.message })
            }
        })
        app.post('/prd/insert', Validator.insertProduct, async (req: InsertRequest, res: Response) => {
            try {
                const add = new AddProduct(services.productRepository)
                const newProduct = await add.exec(req.product)
                res.status(201).json(newProduct)
            } catch (err) {
                res.json({ error: err.message })
            }
        })
        app.patch('/prd/update/:id', Validator.updateProduct, async (req: UpdateRequest, res: Response) => {
            try {
                const { id } = req.params
                const update = new UpdateProduct(services.productRepository)
                const updatedData = await update.exec(id, req.update)
                res.json(updatedData)
            } catch (err) {
                res.json({ error: err.message })
            }
        })
        app.delete('/prd/delete/:id', Validator.deleteProduct, async (req: Request, res: Response) => {
            try {
                const { id } = req.params
                const del = new DeleteProduct(services.productRepository)
                await del.exec(id)
                res.json({ deleted_id: id })
            } catch (err) {
                res.json({ error: err.message })
            }
        })
        process.on('uncaughtException', (error, origin) => console.log(`UncaughtException\nError : ${error}\nOrigin: ${origin}\n`))
        process.on('unhandledRejection', (error) => console.log(`UnhandledRejection\nError : ${error}\n`))
    }
}