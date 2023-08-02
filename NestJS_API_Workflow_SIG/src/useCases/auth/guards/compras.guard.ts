import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthRequest } from '../typings/interfaces'
import { ProductService } from '../../product/product.service'
import { IS_DEPTO_COMPRAS } from '../decorators/deptoCompras.decorator'

@Injectable()
export class ComprasGuard implements CanActivate {
    constructor(private reflector: Reflector, private prodService: ProductService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const checkCompras = this.reflector.get<boolean>(IS_DEPTO_COMPRAS, context.getHandler())
        if (!checkCompras) return true

        const { user } = context.switchToHttp().getRequest<AuthRequest>()

        const userDeptoCompras = await this.prodService.checkDeptoCompras(user.id)
        if (userDeptoCompras) return true

        throw new UnauthorizedException('Invalid access.')
    }
}
