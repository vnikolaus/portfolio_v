import { SetMetadata } from '@nestjs/common'

export const keyNeeded = true
export const KeyNeeded = () => SetMetadata(keyNeeded, true)
