import { access, constants, readFile, writeFile } from 'fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { IParkedCar } from '../../domain/ParkedCar';
import { Plate } from '../../domain/Plate';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class DB {
    static instance: DB
    readonly #path = resolve(__dirname, '.db.json')

    #cars: Map<string, IParkedCar> = new Map()

    async init (): Promise<void> {
        try {
            await access(this.#path, constants.F_OK)
            await this.#load()
        } catch (error) {
            await this.save()
        }
    }

    async #load (): Promise<void> {
        const rawData = await readFile(this.#path, 'utf-8')

        this.#cars = new Map(Array.isArray(JSON.parse(rawData).parkedCars) ? JSON.parse(rawData).parkedCars : new Map())
    }

    async save (): Promise<void> {
        await writeFile(this.#path, JSON.stringify({
            parkedCars: [...this.#cars.entries()]
        }))
    }

    async get (plate: Plate['content']) {
        await this.init()
        return this.#cars.get(plate)
    }

    async list () {
        await this.init()
        return [...this.#cars.values()]
    }

    async insert(car: IParkedCar) {
        this.#cars.set(car['plate'].content, car)
        await this.save()
        return car
    }

    async update (plate: Plate['content'], car: Partial<IParkedCar>) {
        const savedCar = await this.get(plate)
        if (!savedCar) return

        const updatedCar = Object.assign(savedCar,car)

        await this.insert(updatedCar)

        return updatedCar
    }

}