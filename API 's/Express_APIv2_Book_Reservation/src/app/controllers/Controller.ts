import { Config } from "@types/types";

export interface Controller {
    execute(config: Config): Promise<void>
}