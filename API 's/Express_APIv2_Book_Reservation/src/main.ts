import { BookController } from "@controllers/Book.controller";
import { ReservationController } from "@controllers/Reservation.controller";
import { prisma_client } from "@infra/database/connection";
import { BookRepositoryDatabase } from "@infra/repositories/Book.repository-database";
import { ReservationRepositoryDatabase } from "@infra/repositories/Reservation.repository-database";
import { Config } from "@types/types";
import { Server } from "./server";

async function main() {
    const app = new Server()
    const book_repository = new BookRepositoryDatabase(prisma_client)
    const reservation_repository = new ReservationRepositoryDatabase(prisma_client)
    const config: Config = {
        app,
        repositories: {
            book: book_repository,
            reservation: reservation_repository
        }
    }
    const book_controller = new BookController()
    const reservation_controller = new ReservationController()
    book_controller.execute(config)
    reservation_controller.execute(config)
}

main()