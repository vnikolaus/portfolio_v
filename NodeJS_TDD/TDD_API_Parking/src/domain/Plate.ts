export class Plate {
    constructor(readonly content: string) {
        if (!/^[a-z]{3}(\d){4}$/i.test(content)) throw new Error('Invalid plate')
    }
}