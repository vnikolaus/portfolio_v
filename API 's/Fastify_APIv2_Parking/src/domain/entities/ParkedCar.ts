export class ParkedCar {
    private id: number
    private plate: string
    private checkin: Date
    private checkout?: Date
    private total?: number
    
    private constructor(props: ParkedCar) {
        Object.assign(this, props)
    }

    static instance(props: ParkedCar) {
        const car = new ParkedCar({
            ...props,
            checkin: new Date(props.checkin),
            checkout: props.checkout ? new Date(props.checkout) : null,
            total: props.total ? +props.total : null
        })
        return car
    }
}