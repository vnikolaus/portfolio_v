import { SetMetadata } from '@nestjs/common'

export const IS_HOLDING = 'HOLDING'

export const IsHolding = () => SetMetadata('holding', IS_HOLDING)
