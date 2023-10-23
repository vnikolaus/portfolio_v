const Pagination = require("./pagination");

(async () => {
    const pagination = new Pagination()

    const firstPage = 800e3
    const req = pagination.paginated({
        url: 'https://www.mercadobitcoin.net/api/BTC/trades/',
        page: firstPage
    })

    for await (const items of req) {
        console.table(items);
    }
})()