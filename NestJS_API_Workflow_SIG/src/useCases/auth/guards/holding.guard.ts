import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { UserService } from '../../user/user.service'
import { IS_HOLDING } from '../decorators/isHolding.decorator'
import { AuthRequest } from '../typings/interfaces'
import { CELL_ADMIN } from '../../../constants/admin.constants'

@Injectable()
export class HoldingGuard implements CanActivate {
    constructor(private reflector: Reflector, private userService: UserService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isHolding = this.reflector.get<string>('holding', context.getHandler())
        if (!isHolding) return true

        const { user } = context.switchToHttp().getRequest<AuthRequest>()

        const cells = await this.userService.listCellsByPk(user.id)

        for (const i of cells) {
            if (i.fixedType.includes(CELL_ADMIN) || i.fixedType.includes(IS_HOLDING)) return true
        }

        throw new UnauthorizedException('Invalid access.')
    }
}
