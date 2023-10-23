import { randomUUID as uuid } from 'crypto'

type EntityProps = {
    id: string
    props: unknown
}

export abstract class Entity<T> {
    private props: EntityProps

    constructor(props: T, id?: string) {
        this.props = {
            id: id ?? uuid(),
            ...props,
        }
    }
}
