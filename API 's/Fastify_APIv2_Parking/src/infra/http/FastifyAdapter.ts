import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { HttpServer } from "./HttpServer";

export class FastifyAdapter implements HttpServer {
    private #app: FastifyInstance
    private #port = process.env.PORT ?? 3000

    constructor() {
        this.#app = fastify()
        this.#app.register(require('@fastify/postgres'), { connectionString: process.env.POSTGRES_URL })
        this.connect()
    }

    get app() {
        return this.#app
    }

    connect() {
        this.#app.listen({ port: +this.#port }, (err, address) => {
            if (err) console.error(err)
            console.log('Server online :', address);
        }) 
    }

    on(method: string, url: string, options: { [key: string]: any }, callback: Function) {
        this.#app[method](url, options, async (req: FastifyRequest, res: FastifyReply) => {
            try {
                if (method === 'post') res.status(201)
                const dto = {
                    params: req.params,
                    query: req.query,
                    body: req.body
                }
                const output = await callback(dto)
                res.send(JSON.stringify(output))
            } catch (err) {
                res.status(400).send(JSON.stringify({ error: err.message }))
            }
        })
    }
}