import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthRequest } from '../typings/interfaces'
import { ADMIN } from '../../../constants/admin.constants'

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const validation = this.reflector.get<boolean>(ADMIN, context.getHandler())
        if (!validation) return true

        const { user } = context.switchToHttp().getRequest<AuthRequest>()
        if (user.login === ADMIN) return true

        throw new UnauthorizedException('Invalid access.')
    }
}
