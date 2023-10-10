import { Injectable } from '@nestjs/common'
import { UserService } from './useCases/user/user.service'
import { SessionError } from './useCases/auth/errors/errors'

@Injectable()
export class AppService {
    constructor(private userService: UserService) {}

    async getCells(id: number) {
        try {
            const cells = await this.userService.listCellsByPk(id)

            return cells
        } catch (err) {
            throw new SessionError(err.code)
        }
    }
}
