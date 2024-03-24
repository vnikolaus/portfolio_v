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
    private _observers = []

    subscribe<T>(...observers: T): void {
        for(const obs of observers) {
            this._observers.push(obs)
        }
    }

    unsubscribe<T>(observer: T): void {
        const observer_index = this._observers.indexOf(observer)
        if (observer_index === -1) return
        this._observers.splice(observer_index, 1)
    }

    async notify(): Promise<void> {
        const app = new Server()
        const book_repository = new BookRepositoryDatabase(prisma_client)
        const reservation_repository = new ReservationRepositoryDatabase(prisma_client)
        const config: Config = {
            app,
            repositories: {
                book: book_repository,
                reservation: reservation_repository
            }
        }
        this._observers.forEach(async obs => {
            await obs.execute(config)
        })
    }
}