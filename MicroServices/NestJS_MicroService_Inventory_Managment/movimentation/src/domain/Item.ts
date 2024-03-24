import { ItemDTO } from './dto/ItemDTO'

export class Item {
    readonly code: string
    readonly name: string
    readonly qty: number

    constructor(props: ItemDTO) {
        Object.assign(this, props)
    }
}
