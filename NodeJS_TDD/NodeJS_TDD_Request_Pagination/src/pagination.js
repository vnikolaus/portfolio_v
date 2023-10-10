const Request = require("./request")
const { setTimeout } = require('timers/promises')

const DEFAULT_OPTIONS = {
    maxRetries: 4,
    delayRetry: 1100,
    maxRequestTimeout: 1000,
    threshold: 200
}

class Pagination {
    constructor(options = DEFAULT_OPTIONS) {
        this.request = new Request()
        Object.assign(this, options)
    }

    static sleep = (ms) => setTimeout(ms)

    async handleRequest({ url, page, retries = 1 }) {
        try {
            const formatedUrl = `${url}?tid=${page}`
            const request = await this.request.createRequest({
                url: formatedUrl,
                method: 'GET',
                timeout: this.maxRequestTimeout
            })
    
            return request
        } catch (err) {
            if (retries === this.maxRetries) {
                console.error(`Max retries reached !`);
                throw err
            }

            console.log(`Error... Trying again in ${this.delayRetry}ms`);
            await Pagination.sleep(this.delayRetry)

            return this.handleRequest({ url, page, retries: retries += 1 })
        }
    }

    async * paginated({ url, page }) {
        const result = await this.handleRequest({ url, page })
        const lastIndex = result.at(-1)?.tid ?? 0
        if (lastIndex === 0) return

        yield result

        Pagination.sleep(this.threshold)

        yield* this.paginated({ url, page: lastIndex })
    }
}

module.exports = Pagination