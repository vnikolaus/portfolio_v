import { Cell } from '../../../entities/cell.entity'
import * as CELLS from '../../../constants/cell.constants'

export const cellMock1: Cell = new Cell({
    id: CELLS.CELL_ID,
    cell: CELLS.CELL_NAME,
    fixedType: CELLS.CELL_FIXEDTYPE,
})

export const cellMock2: Cell = new Cell({
    id: CELLS.CELL_ID,
    cell: CELLS.CELL_NAME,
    fixedType: CELLS.CELL_FIXEDTYPE,
})

export const arrCellsMock = [cellMock1, cellMock2]
