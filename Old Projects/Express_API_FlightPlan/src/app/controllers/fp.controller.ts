import { Request, Response } from 'express'
import { FpRepository } from '../repositories/fp.repository'
import { Checkin } from '../useCases/checkin'
import { CalculateTaxes } from '../useCases/calculateTaxes'
import { FlightPlan } from '../../domain/FlightPlan'

export class FpController {
    #repo: FpRepository

    constructor(repository: FpRepository) {
        this.#repo = repository
    }

    async list(req: Request, res: Response) {
        try {
            const list = await this.#repo.list()
            return res.json({ flight_plans: list })
        } catch (err) {
            return res.status(400).json({ error: err.message })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params
            const data = req.body

            const updatedFp = await this.#repo.update(+id, data)
            return res.status(200).json({ updated_flightplan: updatedFp })
        } catch (err) {
            return res.status(400).json({ error: err.message })
        }
    }

    async remove(req: Request, res: Response) {
        try {
            const { id } = req.params
            await this.#repo.delete(+id)

            return res.status(200).json({ removed_id: id })
        } catch (err) {
            return res.status(400).json({ error: err.message })
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { origin: reqOrigin, destination: reqDestination } = req.body

            const calculateTaxes = new CalculateTaxes()
            const {
                airportOrigin: origin,
                airportDestination: destination,
                distance,
                price,
            } = await calculateTaxes.calculate(reqOrigin, reqDestination)

            const checkin = new Checkin()
            const fp = await checkin.generate({ origin, destination, distance, price })

            const newFlightPlan = new FlightPlan(fp)
            const data = await this.#repo.insert(newFlightPlan)

            return res.status(201).json({ flightPlan: data })
        } catch (err) {
            return res.status(400).json({ error: err.message })
        }
    }
}
