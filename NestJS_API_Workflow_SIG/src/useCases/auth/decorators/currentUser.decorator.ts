import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { AuthRequest } from '../typings/interfaces'
import { User } from 'src/entities/user.entity'

export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext): User => {
    const req = context.switchToHttp().getRequest<AuthRequest>()
    return req.user
})
