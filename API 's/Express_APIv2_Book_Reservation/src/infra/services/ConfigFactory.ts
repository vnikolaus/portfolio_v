import { prisma_client } from "@infra/database/connection";
import { BookRepositoryDatabase } from "@infra/repositories/Book.repository-database";
import { ReservationRepositoryDatabase } from "@infra/repositories/Reservation.repository-database";
import { Config } from "@types/types";
import { Server } from "../../server";

function ConfigFactory(app: Server): Config {
    const book_repository = new BookRepositoryDatabase(prisma_client)
    const reservation_repository = new ReservationRepositoryDatabase(prisma_client)
    const config: Config = {
        app,
        repositories: {
            book: book_repository,
            reservation: reservation_repository
        }
    }
    return config
}