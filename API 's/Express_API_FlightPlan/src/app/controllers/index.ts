import { FpController } from './fp.controller'
import { fpRepository } from '../repositories'

const fpController = new FpController(fpRepository)

export { fpController }
