import { v4 } from 'uuid'

abstract class Entity<T> {
    private readonly _id: string
    public props: T

    constructor(props: T, id?: string) {
        this.props = props
        this._id = id ?? v4()
    }

    get id() {
        return this._id
    }
}

export { Entity }
