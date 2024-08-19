import { CanActivate, ExecutionContext, Injectable, SetMetadata, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'

export const PUBLIC_ENDPOINT = 'publicEndpoint'
export const IsPublic = () => SetMetadata(PUBLIC_ENDPOINT, true)

@Injectable()
export class JwtGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_ENDPOINT, [context.getHandler(), context.getClass()])
        if (isPublic) return true
        const request = context.switchToHttp().getRequest()
        const token = this.#extractTokenFromHeader(request.headers)
        if (!token) return false
        try {
            const payload = await this.jwtService.verifyAsync(token, { secret: process.env.TOKEN_SECRET })
            request['user'] = payload
        } catch (err) {
            throw new UnauthorizedException()
        }
        return true
    }

    #extractTokenFromHeader({ authorization }: Request['headers']) {
        const [bearer, token] = authorization.split(' ')
        return bearer === 'Bearer' ? token : undefined
    }
}
