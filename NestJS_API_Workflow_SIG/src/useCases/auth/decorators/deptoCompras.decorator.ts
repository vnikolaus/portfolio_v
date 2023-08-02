import { SetMetadata } from '@nestjs/common'

export const IS_DEPTO_COMPRAS = 'compras'

export const DeptoCompras = () => SetMetadata(IS_DEPTO_COMPRAS, true)
