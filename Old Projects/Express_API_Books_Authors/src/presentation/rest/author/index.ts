import { Router } from "express";
import { Config } from "../../../server";
import { list } from "./list";
import { create } from "./create";
import { find } from "./find";
import { remove } from "./remove";
import { update } from "./update";

export const authorRoutesFactory = (services: Config['services']) => {
    const router = Router()

    router.get('/', list(services.authorService))
    router.get('/:id', find(services.authorService))
    router.delete('/:id', remove(services.authorService))
    router.patch('/:id', update(services.authorService))
    router.post('/', create(services.authorService))

    return router
}