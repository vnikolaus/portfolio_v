import { Config, RequestData, ReservationProps } from "@types/types";
import { AddReservation } from "@useCases/AddReservation";
import { DeleteReservation } from "@useCases/DeleteReservation";
import { FindReservations } from "@useCases/FindReservations";
import z from 'zod';
import { Controller } from "./Controller";

export class ReservationController implements Controller {
    execute({ app, repositories }: Config) {
        app.on('post', '/add/reservation', async ({ body }: RequestData<ReservationProps>) => {
            const zod = z.object({
                book_id: z.number().min(1),
                duration: z.number().min(1),
            })
            const valid_body = zod.parse(body)
            const add_reservation = new AddReservation(repositories.reservation)
            const output = await add_reservation.execute(valid_body)
            return {
                status: 201,
                output
            }
        })
        app.on('get', '/reservations', async (data: RequestData<{}>) => {
            const find_reservations = new FindReservations(repositories.reservation)
            const reservations = await find_reservations.execute()
            return {
                output: reservations
            }
        })
        app.on('delete', '/reservation/:id', async ({ params }: RequestData<{ id: string }>) => {
            const zod = z.object({
                id: z.string().min(1),
            })
            const { id } = zod.parse(params)
            const delete_reservation = new DeleteReservation(repositories.reservation)
            await delete_reservation.execute(id)
            return {
                output: { deleted_id: id }
            }
        })
    }
}