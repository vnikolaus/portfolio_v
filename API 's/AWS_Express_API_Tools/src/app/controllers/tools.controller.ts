import { Request, Response } from "express";
import { ToolsRepository } from "../repositories/tools.repository";

export class ToolsController {
    #repository: ToolsRepository

    constructor (repository: ToolsRepository) {
        this.#repository = repository
    }

    async listTools(req: Request, res: Response) {
        const tools = await this.#repository.list()
        return res.json({ tools })
    }

    async find(req: Request, res: Response) {
        const { code } = req.params
        const { Items: [ tool ] } = await this.#repository.findOne(code)
        return res.json(tool)
    }

    async add(req: Request, res: Response) {
        const { stock, code, toolName } = req.body
        const newTool =  await this.#repository.insert({ stock, code, toolName })
        return res.json(newTool)
    }

    async update(req: Request, res: Response) {
        const { stock, code, toolName } = req.body
        const updatedTool = await this.#repository.update({ code, toolName, stock })
        return res.json(updatedTool)
    }

    async remove(req: Request, res: Response) {
        const { code } = req.params
        const removedTool = await this.#repository.delete(code)
        return res.json(removedTool)
    }
}