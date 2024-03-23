import express from 'express'
import bodyParser from 'body-parser';
import type { Config } from "../../server";
import { authorRoutesFactory } from './author';
import { bookRoutesFactory } from './book';
const app = express()

export const restLayer = (config: Config) => {
    app.use(bodyParser.json())
    app.use('/authors', authorRoutesFactory(config.services))
    app.use('/books', bookRoutesFactory(config.services))

    app.listen(config.port || 3000, () => {
        console.log(`API online...\nhttp://localhost:${config.port}`);
    })
}