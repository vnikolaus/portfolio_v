import { BookController } from "@controllers/Book.controller";
import { ReservationController } from "@controllers/Reservation.controller";
import { ControllersObserver } from "@infra/services/Observer";

async function main() {
    const observer = new ControllersObserver()
    const book_controller = new BookController()
    const reservation_controller = new ReservationController()
    observer.subscribe<BookController>(book_controller)
    observer.subscribe<ReservationController>(reservation_controller)
    await observer.notify()
}

main()