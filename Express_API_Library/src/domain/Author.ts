import { v4 as uuid } from "uuid"

export interface AuthorProps {
    id: string
    name: string
    email: string
    bornDate: Date
    bio: string
}

export class Author {
    private readonly props: AuthorProps

    constructor(props: AuthorProps, id?: string) {
        this.props = props
        this.props.id = id ?? uuid()
    }

    get object(): AuthorProps {
        return {
            ...this.props,
        }
    }
}