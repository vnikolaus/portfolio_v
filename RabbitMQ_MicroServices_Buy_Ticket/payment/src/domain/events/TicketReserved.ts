export class TicketReserved {
    private ticket_id: string
    private event_id: string
    private email: string
    private creditCardToken: string
    private price: number

    constructor(props: { ticket_id: string; event_id: string; email: string; creditCardToken: string; price: number }) {
        Object.assign(this, props)
    }
}
