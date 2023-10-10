import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { keyNeeded } from '../decorators/key.decorator'
import { KEY_INSTANCE } from '../keys/Key'

@Injectable()
export class KeyGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const validation = this.reflector.get<boolean>(keyNeeded, context.getHandler())
        if (!validation) return true

        const {
            params: { key },
        } = context.switchToHttp().getRequest()

        const findKey = await KEY_INSTANCE.findKey({ key })
        if (!findKey) throw new UnauthorizedException('Invalid access.')

        return true
    }
}
