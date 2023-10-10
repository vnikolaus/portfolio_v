import { db } from "../db/conn";
import { ToolsRepository } from "./tools.repository";

const toolsRepository = new ToolsRepository(db)

export { toolsRepository }