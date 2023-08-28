const { describe, it, before, afterEach } = require('mocha')
const { createSandbox } = require('sinon')
const assert = require('assert')
const Request = require('../src/request')
const Events = require('events')

describe('Request - Class', () => {
    const timeout = 15
    let sandbox
    let request

    before(() => {
        sandbox = createSandbox()
        request = new Request()
    })

    afterEach(() => sandbox.restore())

    describe('Timeout', () => {
        it(`Should throw a timeout error if request takes longer than ${timeout}ms `, async () => {
            const exceededTimeout = timeout + 10
            sandbox.stub(request, request.get.name).callsFake(() => new Promise(res => setTimeout(res, exceededTimeout)))

            const req = request.createRequest({ url: 'https://testing.net', method: 'GET', timeout })

            await assert.rejects(req, { message: `URL: [https://testing.net] - Timeout Error` })
        })

        it(`Should return ok when timeout is not hitted`, async () => {
            const expected = { success: 'ok' }
            sandbox.stub(request, request.get.name).resolves(expected)

            const req = () => request.createRequest({ url: 'https://testing.net', method: 'GET', timeout })

            await assert.doesNotReject(req)
            assert.deepStrictEqual(await req(), expected)
        })
    })

    describe('Returns', () => {
        it(`Should return a JSON object after request`, async () => {
            const data = [
                Buffer.from('{"ok": '),
                Buffer.from('"ok"'),
                Buffer.from('}')
            ]

            const responseEvent = new Events()
            const httpEvent = new Events()
            
            const https = require('https')
            sandbox.stub( 
                https,
                https.get.name
            ).yields(responseEvent)
            .returns(httpEvent)

            const expected = { ok: 'ok' }
            const pendingPromise = request.get('https://testing.net')
            
            responseEvent.emit('data', data[0])
            responseEvent.emit('data', data[1])
            responseEvent.emit('data', data[2])
            responseEvent.emit('end')
            
            const result = await pendingPromise
            assert.deepStrictEqual(result, expected)
        })
    })

})