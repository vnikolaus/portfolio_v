import { Router } from "express";
import { Config } from "../../../server";
import { list } from "./list";
import { create } from "./create";
import { find } from "./find";
import { remove } from "./remove";
import { update } from "./update";
import { getAuthors } from "./getAuthors";

export const bookRoutesFactory = (services: Config['services']) => {
    const router = Router()

    router.get('/', list(services.bookService))
    router.get('/:id', find(services.bookService))
    router.get('/:id/authors', getAuthors(services.bookService))
    router.delete('/:id', remove(services.bookService))
    router.patch('/:id', update(services.bookService))
    router.post('/', create(services.bookService))

    return router
}