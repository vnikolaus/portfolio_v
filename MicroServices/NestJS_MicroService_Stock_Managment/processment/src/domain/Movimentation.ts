import { Item } from './Item'

export class Movimentation {
    readonly id: string
    readonly item: Item
    readonly quantity: Item['qty']
    readonly createdAt: Date
    updatedAt: Date
    status: string

    private constructor(props: TMovimentation) {
        Object.assign(this, props)
    }

    static restore(movimentation: Movimentation) {
        return new Movimentation(movimentation)
    }

    approve(msg?: string) {
        this.status = `approved - ${msg ?? 'Process OK.'}`
    }

    reject(msg?: string) {
        this.status = `rejected - ${msg ?? 'Process failed.'}`
    }
}

type TMovimentation = {
    id: string
    item: Item
    quantity: Item['qty']
    createdAt: Date
    updatedAt: Date
    status: string
}
