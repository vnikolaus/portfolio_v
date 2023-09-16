import { toolsRepository } from "../repositories";
import { ToolsController } from "./tools.controller";

const toolsController = new ToolsController(toolsRepository)

export { toolsController }