import { Controller } from "@controllers/Controller"
import { prisma_client } from "@infra/database/connection"
import { BookRepositoryDatabase } from "@infra/repositories/Book.repository-database"
import { ReservationRepositoryDatabase } from "@infra/repositories/Reservation.repository-database"
import { Config } from "@types/types"
import { Server } from "../../server"

interface Observer {
    subscribe<T>(...observers: T): void
    unsubscribe<T>(observer: T): void
    notify(): Promise<void>
}

export class ControllersObserver implements Observer {
    private _observers: Controller[] = []

    subscribe(...observers: Controller[]): void {
        for(const obs of observers) {
            this._observers.push(obs)
        }
    }

    unsubscribe(observer: Controller): void {
        const observer_index = this._observers.indexOf(observer)
        if (observer_index === -1) return
        this._observers.splice(observer_index, 1)
    }

    notify(): Promise<void> {
        const app = new Server()
        const config = ConfigFactory(app)
        this._observers.forEach(async obs => {
            await obs.execute(config)
        })
    }
}