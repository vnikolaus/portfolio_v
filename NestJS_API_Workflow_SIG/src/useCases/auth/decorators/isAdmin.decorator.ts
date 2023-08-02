import { SetMetadata } from '@nestjs/common'
import { ADMIN } from '../../../constants/admin.constants'

export const IsAdmin = () => SetMetadata(ADMIN, true)
