const Request = require("./request");
const request = new Request()

async function scheduler() {
    console.time('sched')

    const requests = [
        { url: 'https://swapi.dev/api/people/1/' },
        { url: 'https://test-eRROR.net' },
    ].map(data => ({
        ...data,
        timeout: 2000,
        method: 'GET'
    })).map(params => request.createRequest(params))

    const statusResult = await Promise.allSettled(requests)
    const succededRequest = []
    const errorRequest = []

    for (const { status, value, reason } of statusResult) {
        status === 'rejected' ? errorRequest.push(reason) : succededRequest.push(value)
    }

    console.timeEnd('sched')

    console.log({
        succededRequest: JSON.stringify(succededRequest),
        errorRequest
    })
}

scheduler()