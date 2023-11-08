import express, { Request, Response } from 'express'
import { HttpServer } from './HttpServer'

export class ExpressAdapter implements HttpServer {
    private app: Express

    constructor() {
        this.app = express()
        this.use(express.json())
    }

    async on(method: string, url: string, callback: FunctionConstructor): never {
        this.app[method](url, async (req: Request, res: Response) => {
            const output = await callback({ params: req.params, body: req.body, query: req.query })
            return res.json(output)
        })
    }

    async listen(port: number | string): never {
        this.app.listen(+port, () => console.log(`Server running at ${port}`))
    }

    async use(param: unknown): never {
        this.app.use(param)
    }
}
