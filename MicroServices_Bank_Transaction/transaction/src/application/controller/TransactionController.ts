import { ExpressAdapter } from '../../infra/http/ExpressAdapter'
import { registry } from '../../infra/registry'
import { TransactionRepositoryDatabase } from '../../infra/repository/TransactionRepositoryDatabase'
import { CreateTransaction } from '../useCases/CreateTransaction'
const app = new ExpressAdapter()

type RequestProps = {
    params?: unknown
    body?: unknown
    query?: unknown
}

app.on('post', process.env.ENDPOINT_1, async ({ body, params, query }: RequestProps) => {
    const transaction = new CreateTransaction(registry)
    const createdTransaction = await transaction.execute(body)
    return createdTransaction
})

app.on('get', process.env.ENDPOINT_2, async ({ body, params, query }: RequestProps) => {
    const transactionRepository = new TransactionRepositoryDatabase(registry)
    return await transactionRepository.get(params.id)
})

app.listen(process.env.PORT ?? 3000)
