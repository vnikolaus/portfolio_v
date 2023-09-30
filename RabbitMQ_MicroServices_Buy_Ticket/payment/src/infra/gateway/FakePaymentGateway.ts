export class FakePaymentGateway {
    async createTransaction(email: string, creditCardToken: string, price: number) {
        if (!email || !creditCardToken) throw new Error('Invalid transaction')
        const fakeStatus = 'approved'
        const tid = '951847623'

        return {
            tid,
            price,
            status: fakeStatus,
        }
    }
}
