import { v4 as uuid } from "uuid"

export interface BookProps {
    id: string
    title: string
    authors: string[]
    description: string
    pages: number
    isbn: string
}

export class Book {
    private readonly props: BookProps

    constructor(props: BookProps, id?: string) {
        this.props = props
        this.props.id = id ?? uuid()
    }

    get object(): BookProps {
        return {
            ...this.props,
        }
    }
}