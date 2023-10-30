export class Email {
    constructor(readonly content: string) {
        const regex = /^([a-zA-Z0-9]*)+@+([a-zA-Z0-9]*)+\.+([a-z0-9]){2,3}(\.[a-z0-9]{2})?/
        if (!regex.test(content) || content.length < 7) throw new Error('Invalid e-mail')
    }
}
