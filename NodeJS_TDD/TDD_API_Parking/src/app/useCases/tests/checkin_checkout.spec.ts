import { beforeEach, describe, expect, it } from 'vitest'
import { parkingRepository } from '../../repositories'
import { Checkin } from '../checkin'
import { Checkout } from '../checkout'
import { DB } from '../../../infra/database/db'

describe('Checkin & Checkout', () => {
    let checkin: Checkin
    let checkout:Checkout

    beforeEach(() => {
        checkin = new Checkin(parkingRepository)
        checkout = new Checkout(parkingRepository)
    })

    describe('Process', () => {
        it('Should checkin and checkout a car from parking lot, and calculates the ticket price', async () => {
            const plate = 'ABC1234'
    
            const parkedCar = await checkin.execute(plate, new Date('2023-08-01T11:00:00'))
    
            expect(parkedCar).toHaveProperty('checkinDate')
            expect(parkedCar?.checkinDate).not.toBeNull()
    
            const checkoutCar = await checkout.execute(plate, new Date('2023-08-01T14:00:00'))
            
            expect(checkoutCar).not.toBeUndefined()
            expect(checkoutCar).toHaveProperty('checkoutDate')
            expect(checkoutCar).toHaveProperty('ticketPrice')
            expect(checkoutCar?.ticketPrice).toBe(45)
        })
    })
    
    describe('Plate Validations', () => {
        it('Should not checkin a invalid plate', async () => {
            const plate = 'AB1231'
    
            expect(checkin.execute(plate, new Date('2023-08-01T10:00:00.00'))).rejects.toThrow(new Error('Invalid plate'))
        })
    
        it('Should not checkout a invalid plate', async () => {
            const plate = 'AB1111'
    
            expect(checkout.execute(plate, new Date('2023-08-01T10:00:00.00'))).rejects.toThrow(new Error('Invalid plate'))
        })
    
        it('Should not checkout a undentified plate', async () => {
            const plate = 'ABC0000'
    
            expect(checkout.execute(plate, new Date('2023-08-01T10:00:00.00'))).rejects.toThrow(new Error('Undentified plate'))
        })
    })

    describe('Period Validations', () => {
        it('Should not checkin/checkout before 08:00AM', async () => {
            const plate = 'ABC1234'
    
            expect(checkin.execute(plate, new Date('2023-08-01T07:00:00.00'))).rejects.toThrow(new Error('Parking lot is out of operation time'))
            expect(checkout.execute(plate, new Date('2023-08-01T07:00:00.00'))).rejects.toThrow(new Error('Parking lot is out of operation time'))
        })

        it('Should not checkin/checkout after 21:00PM', async () => {
            const plate = 'ABC1234'
    
            expect(checkin.execute(plate, new Date('2023-08-01T22:00:00.00'))).rejects.toThrow(new Error('Parking lot is out of operation time'))
            expect(checkout.execute(plate, new Date('2023-08-01T22:00:00.00'))).rejects.toThrow(new Error('Parking lot is out of operation time'))
        })
    
    })


})