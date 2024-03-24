import { BookProps } from "@types/types"

export class Book {
    readonly id?: number
    readonly title: string
    readonly author: string
    readonly pages: number
    readonly created_at: string

    constructor(props: BookProps) {
        Object.assign(this, {
            ...props,
            created_at: new Date().toISOString()
        })
    }
}