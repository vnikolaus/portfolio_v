const https = require('https')

class Request {
    timeoutError = (reject, urlRequest) => () => reject(new Error(`URL: [${urlRequest}] - Timeout Error` ))

    get(url) {
        return new Promise((resolve, reject) => {
            https.get(url, res => {
                const items = []
                res
                    .on('data', data => items.push(data))
                    .on('end', () => resolve(JSON.parse(items.join(''))))
            }).on('error', reject)
        })
    }

    createRequest({ url, method, timeout }) {
        method = method.toLowerCase()
        return Promise.race([
            this[method](url),
            this.PromiseTimeout(url, timeout)
        ])
    }

    PromiseTimeout(url, timeout) {
        return new Promise((res, rej) => { 
            setTimeout(this.timeoutError(rej, url), timeout)
        })
    }
}

module.exports = Request