import { Request } from "express"
import { Server } from "../../server"
import { BookRepository } from "@repositories/Book.repository"
import { ReservationRepository } from "@repositories/Reservation.repository"

export type Config = {
    app: Server
    repositories: {
        book: BookRepository
        reservation: ReservationRepository
    }
}

export type RequestData<T> = {
    params: T
    query: T
    body: T
}

export type BookProps = {
    title: string
    author: string
    pages: number
}

export type ReservationProps = {
    book_id: number
    duration: number
}