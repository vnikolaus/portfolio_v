import { BookController } from "@controllers/Book.controller";
import { ReservationController } from "@controllers/Reservation.controller";
import { ControllersObserver } from "@infra/services/Observer";
import { Server } from "./server";

async function main() {
    const app = new Server()
    const observer = new ControllersObserver()
    observer.subscribe(new BookController(), new ReservationController())
    observer.notify(app)
}

main()