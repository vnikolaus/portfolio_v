import { randomUUID } from 'crypto'
import * as USER from '../../../constants/user.constants'
import { AuthRequest } from '../typings/interfaces'
import { AcessTokenProps } from '../typings/types'

export const mockRequest = {
    user: {
        id: USER.ID,
        name: USER.NAME,
        login: USER.LOGIN,
        password: USER.PWD,
        created_at: new Date(),
        updated_at: new Date(),
        cells: [],
    },
} as unknown as AuthRequest

export const tokenMock: AcessTokenProps = {
    accessToken: String(randomUUID()),
}
