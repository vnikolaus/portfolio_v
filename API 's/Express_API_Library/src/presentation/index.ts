import type { Config } from "../server";
import { restLayer } from './rest'

const start = (config: Config) => {
    restLayer(config)
}

export { start }