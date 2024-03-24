import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { RequestData } from '@types/types'
import express, { Request, Response } from 'express'
import { ZodError } from 'zod'

export class Server {
    private readonly app = express()
    
    constructor() {
        this.connect()
        this.middlewares()
    }

    middlewares() {
        this.app.use(express.json())
    }

    connect() {
        const port = parseInt(process.env.SERVER_PORT) ?? 3333
        this.app.listen(port, () => console.log(`Server online: http://localhost:${port}`))
    }

    on(method: string, endpoint: string, callback: Function) {
        this.app[method](endpoint, async (req: Request, res: Response) => {
            try {
                const request_data: RequestData = {
                    params: req.params,
                    query: req.query,
                    body: req.body
                }
                const data = await callback(request_data)
                res.status(data.status ?? 200).json(data.output)
            } catch (err) {
                res.status(400)
                if (err instanceof ZodError) {
                    res.json({ error: err.errors[0].message })
                } else if (err instanceof PrismaClientKnownRequestError) {
                    res.json({ error: `Unique constraint failed on the fields: [${err.meta.target}]` })
                } else {
                    res.json({ error: err.message })
                }
            }
        })
    }
}