import { beforeEach, describe, expect, it } from 'vitest'
import { parkingRepository as repository } from '.'
import { ParkingRepository } from './parking.repository'
import { Plate } from '../../domain/Plate'

describe('Parking Repository', () => {
    const plate = 'ABC1234'
    let parkingRepository: ParkingRepository 

    beforeEach(() => {
        parkingRepository = repository
    })

    describe('#add', () => {
        it('Should insert a parked car into database', async () => {
            const _plate = new Plate(plate)
            const parkedCar = await parkingRepository.add({
                plate: _plate,
            })
            
            expect(parkingRepository.findOne(parkedCar['plate']['content'])).resolves.toEqual(parkedCar)
            expect(parkedCar.plate).toBeInstanceOf(Plate)
        })
    })

    describe('#findOne', () => {
        it('Should return a single parked car', async () => {
            const parkedCar = await parkingRepository.findOne(plate)
            
            expect([parkedCar].length).toBe(1)
            expect(parkedCar).toHaveProperty('plate')
        })
    })

    describe('#update', () => {
        it('Should update a parked car', async () => {
            const inDate = new Date('2023-08-01T10:00:00Z')
            const updatedParkedCar = await parkingRepository.update(plate, { checkinDate: inDate })
            
            expect(updatedParkedCar['plate']['content']).toEqual(plate)
            expect(updatedParkedCar['checkinDate']).toEqual(inDate)
        })
    })

})