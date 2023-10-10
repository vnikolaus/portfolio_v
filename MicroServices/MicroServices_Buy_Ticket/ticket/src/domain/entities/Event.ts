import { randomUUID as uuid } from 'crypto'

export class Event {
    private event_id: string
    private description: string
    private capacity: number
    private price: number
    private location: string

    constructor(props: { event_id: string; description: string; capacity: number; price: number; location: string }) {
        Object.assign(this, {
            event_id: props.event_id ?? uuid(),
            ...props,
        })
    }
}
