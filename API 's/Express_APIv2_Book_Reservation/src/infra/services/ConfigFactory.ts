import { prisma_client } from "@infra/database/connection";
import { BookRepositoryDatabase } from "@infra/repositories/Book.repository-database";
import { ReservationRepositoryDatabase } from "@infra/repositories/Reservation.repository-database";
import { Config } from "@types/types";
import { Server } from "../../server";

export function ConfigFactory(app: Server): Config {
    const config: Config = {
        app,
        repositories: {
            book: new BookRepositoryDatabase(prisma_client),
            reservation: new ReservationRepositoryDatabase(prisma_client),
        }
    }
    return config
}