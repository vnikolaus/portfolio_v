import { Cell } from '../../../entities/cell.entity'
import { User } from '../../../entities/user.entity'
import * as CONSTANTS from '../../../constants/user.constants'
import * as CELLS from '../../../constants/cell.constants'

export const userMock: User = new User({
    id: CONSTANTS.ID,
    name: CONSTANTS.NAME,
    login: CONSTANTS.LOGIN,
    password: undefined,
})

export const cm1: Cell = new Cell({
    id: CELLS.CELL_ID,
    cell: CELLS.CELL_NAME,
    fixedType: CELLS.CELL_FIXEDTYPE,
})

export const cm2: Cell = new Cell({
    id: CELLS.CELL_ID,
    cell: CELLS.CELL_NAME,
    fixedType: CELLS.CELL_FIXEDTYPE,
})

export const cellsMock = [cm1, cm2]
