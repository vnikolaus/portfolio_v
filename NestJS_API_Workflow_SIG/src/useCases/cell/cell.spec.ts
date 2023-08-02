import { Test } from '@nestjs/testing'
import { CellController } from './cell.controller'
import { CellService } from './cell.service'
import * as CELLS from '../../constants/cell.constants'
import { CellDTO } from './dto/cell.dto'
import { arrCellsMock, cellMock1 } from './mocks/CellMocks'
import { Cell } from '../../entities/cell.entity'
import { ID } from '../../constants/user.constants'

describe(`Test's Cell - UseCase`, () => {
    let cellController: CellController
    let cellService: CellService

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [CellController],
            providers: [
                {
                    provide: CellService,
                    useValue: {
                        create: jest.fn().mockReturnValue(cellMock1),
                        listCells: jest.fn().mockReturnValue(arrCellsMock),
                        listCellMembers: jest.fn().mockReturnValue(arrCellsMock),
                    },
                },
            ],
        }).compile()

        cellController = module.get<CellController>(CellController)
        cellService = module.get<CellService>(CellService)
    })

    it('should be defined', async () => {
        expect(cellController).toBeDefined()
        expect(cellService).toBeDefined()
    })

    describe('create', () => {
        it(`Should create a new cell`, async () => {
            const newCell = await cellController.create({
                id: CELLS.CELL_ID,
                cell: CELLS.CELL_NAME,
                fixedType: CELLS.CELL_FIXEDTYPE,
            } as CellDTO)

            const spy = jest.spyOn(cellService, 'create')

            expect(newCell).toBeInstanceOf(Cell)
            expect(newCell).toEqual(cellMock1)
            expect(newCell.fixedType).toEqual(cellMock1.fixedType)
            expect(spy).toHaveBeenCalledTimes(1)
        })
    })

    describe('list', () => {
        it(`Should list a cells`, async () => {
            const cells = await cellService.listCells()

            const spy = jest.spyOn(cellService, 'listCells')

            expect(cells).toEqual(arrCellsMock)
            expect(cells[0]).toHaveProperty('created_at')
            expect(spy).toHaveBeenCalledTimes(1)
        })
    })

    describe('listCellMembers', () => {
        it(`Should list cells of a member`, async () => {
            const cells = await cellService.listCellMembers(ID)

            const spy = jest.spyOn(cellService, 'listCellMembers')

            expect(cells).toEqual(arrCellsMock)
            expect(cells[0]).toHaveProperty('created_at')
            expect(spy).toHaveBeenCalledTimes(1)
        })
    })
})
