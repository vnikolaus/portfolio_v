const { describe, before, afterEach, it } = require('mocha')
const { createSandbox } = require('sinon')
const assert = require('assert')
const Pagination = require('../src/pagination')
const Request = require('../src/request')

describe('Pagination - Class', () => {
    let sandbox

    before(() => {
        sandbox = createSandbox()
    })

    afterEach(() => sandbox.restore())
    describe('#Sleep', async () => {
        it('Should be a promise and not return values', async () => {
            const timer = sandbox.useFakeTimers()
            const timeout = 1
            const pendingPromise = Pagination.sleep(timeout)
            timer.tick(timeout)
            
            assert.ok(pendingPromise instanceof Promise)
            assert.deepStrictEqual(await pendingPromise, undefined)
        })
    })

    describe('#HandleRequest', () => {
        it(`Should retry request after the first one throw a error. (Limit twice)`, async () => {
            const expectedCalls = 2
            const expectedTimeout = 10
            
            const pagination = new Pagination()
            pagination.maxRetries = expectedCalls
            pagination.delayRetry = expectedTimeout
            pagination.maxRequestTimeout = expectedTimeout

            const error = new Error('Timeout Error')

            sandbox.spy(pagination, pagination.handleRequest.name)

            sandbox.stub( 
                Pagination,
                Pagination.sleep.name
            ).resolves()

            sandbox.stub(
                pagination.request,
                pagination.request.createRequest.name
            ).rejects(error)

            const request = { url: 'https://testing.net', page: 0 }

            await assert.rejects(pagination.handleRequest(request), error)
            assert.deepStrictEqual(pagination.handleRequest.callCount, expectedCalls)

            const lastCall = 1
            const { retries } = pagination.handleRequest.getCall(lastCall).lastArg

            assert.deepStrictEqual(retries, expectedCalls)

            const expectedObj = {
                url: `${request.url}?tid=${request.page}`,
                method: 'GET',
                timeout: expectedTimeout
            }

            const [ args ] = pagination.request.createRequest.getCall(0).args
            assert.deepStrictEqual(args, expectedObj)

            assert.ok(Pagination.sleep.calledWithExactly(expectedTimeout))
        })

        it(`Should return a data from succeded request`, async () => {
            const data = { success: 'ok' }
            const pagination = new Pagination()

            sandbox.stub(
                pagination.request,
                pagination.request.createRequest.name
            ).resolves(data)

            const result = await pagination.handleRequest({ url: 'https://testing.net', page: 1 })
            assert.deepStrictEqual(result, data)
        })
    })

    describe('#Paginated', () => {
        const responseMock = [
            {
                "amount": 1,
                "date": 1371096416,
                "price": 261,
                "tid": 4719,
                "type": "sell"
            },
            {
                "amount": 0.1332069,
                "date": 1371122617,
                "price": 260,
                "tid": 4720,
                "type": "buy"
            },
        ]

        it('Should have a default options on Pagination instance', () => {
            const pagination = new Pagination()
            const expectedProperties = {
                maxRetries: 4,
                delayRetry: 1100,
                maxRequestTimeout: 1000,
                threshold: 200
            }

            assert.ok(pagination.request instanceof Request)
            Reflect.deleteProperty(pagination, 'request')

            const getEntries = value => Object.entries(value)
            
            assert.deepStrictEqual(getEntries(pagination), getEntries(expectedProperties))
        })

        it('Should set a new properties on Pagination instance', () => {
            const properties = {
                maxRetries: 2,
                delayRetry: 100,
                maxRequestTimeout: 100,
                threshold: 20
            }

            const pagination = new Pagination(properties)

            assert.ok(pagination.request instanceof Request)

            const expectedProperties = {
                request: {},
                ...properties
            }

            assert.deepStrictEqual(JSON.stringify(pagination), JSON.stringify(expectedProperties))
        })

        it('Should update request id on each request', async () => {
            const pagination = new Pagination()
            const req = { url: 'https://testing.net', page: 1 }
 
            sandbox.spy(pagination, pagination.paginated.name)

            sandbox.stub( 
                Pagination,
                Pagination.sleep.name
            ).resolves()

            sandbox.stub( 
                pagination,
                pagination.handleRequest.name
            ).onCall(0).resolves([responseMock[0]])
             .onCall(1).resolves([responseMock[1]])
             .onCall(2).resolves([])

            assert.deepStrictEqual(pagination.handleRequest.onFirstCall().returnValue, [responseMock[0]])
            assert.deepStrictEqual(pagination.handleRequest.onSecondCall().returnValue, [responseMock[1]])
            assert.deepStrictEqual(pagination.handleRequest.onThirdCall().returnValue, [])

            const gen = pagination.paginated(req)

            for await (const result of gen) { }
        })

        it('Should stop request when return a empty array', async () => {
            const pagination = new Pagination()
            const req = { url: 'google.com', page: 1 }
            pagination.threshold = 20
 
            sandbox.spy(pagination, pagination.paginated.name)

            sandbox.stub( 
                Pagination,
                Pagination.sleep.name
            ).resolves()

            sandbox.stub( 
                pagination,
                pagination.handleRequest.name
            ).onCall(0).resolves([responseMock[0]])
             .onCall(1).resolves([])
                        
            const data = await pagination.paginated(req)
            const [firstReg, secondReg] = await Promise.all([
               data.next(),
               data.next()
            ])

            const expectedFirstCall = { done: false, value: [responseMock[0]] }
            assert.deepStrictEqual(firstReg, expectedFirstCall)

            const expectedSecondCall = { done: true, value: undefined }
            assert.deepStrictEqual(secondReg, expectedSecondCall)

            assert.deepStrictEqual(Pagination.sleep.callCount, 1)
            assert.ok(Pagination.sleep.calledWithExactly(20))
        })
    })

})