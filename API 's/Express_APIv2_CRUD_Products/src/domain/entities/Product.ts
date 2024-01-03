import { randomUUID as uuid } from "crypto"
import { GMT } from "../../infra/services/GMT"

type Props = {
    id?: string
    code: string
    description: string
    storage: string
    price: string
    supplier: string
    barcode: string
    createdAt?: string
    updatedAt?: string
}

export class Product {
    private readonly id: string
    private readonly code: string
    private readonly description: string
    private readonly storage: string
    private readonly price: string
    private readonly supplier: string
    private readonly barcode: string
    private readonly createdAt: string
    private readonly updatedAt: string

    constructor(props: Props) {
        const newThis = {
            id: props.id ?? uuid(),
            ...props,
            createdAt: props.createdAt ?? GMT.format(new Date()),
            updatedAt: props.updatedAt ?? GMT.format(new Date())
        }
        Object.assign(this, newThis)
    }
}