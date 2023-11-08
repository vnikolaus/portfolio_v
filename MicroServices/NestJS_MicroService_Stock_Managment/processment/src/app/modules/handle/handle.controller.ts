import { Controller, UnauthorizedException } from '@nestjs/common'
import { HandleService } from './handle.service'
import { Movimentation } from '../../../domain/Movimentation'
import { EventPattern } from '@nestjs/microservices'

@Controller()
export class HandleController {
    constructor(private readonly handleService: HandleService) {}

    @EventPattern('new_movimentation')
    async handleMovimentation(movimentation: Movimentation) {
        try {
            await this.handleService.exec(movimentation)
        } catch (err) {
            throw new UnauthorizedException(err.message)
        }
    }
}
