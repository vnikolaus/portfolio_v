import { Controller } from "@controllers/Controller"
import { Server } from "../../server"
import { ConfigFactory } from "./ConfigFactory"

interface Observer {
    subscribe(...observers: Controller[]): void
    unsubscribe(observer: Controller): void
    notify(app: Server): Promise<void>
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

    notify(app: Server): Promise<void> {
        const config = ConfigFactory(app)
        this._observers.forEach(obs => {
            obs.execute(config)
        })
    }
}