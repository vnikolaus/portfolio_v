export class TicketApproved {
    private ticket_id: string

    constructor(props: { ticket_id: string }) {
        Object.assign(this, props)
    }
}
