import { IncomingMessage, ServerResponse, createServer, } from 'http'
import { parkingRepository } from './app/repositories'
import { Checkin } from './app/useCases/checkin'
import { Checkout } from './app/useCases/checkout'


const handler = (request: IncomingMessage, response: ServerResponse) => {
    const url  = request.url as string
    const method  = request.method as string

    request.on('data', async () => {
        if (url.includes('/checkin') && method === 'POST') {
            const checkin = new Checkin(parkingRepository)
            const plate = url.slice(-7)

            const parkedCar = await checkin.execute(plate, new Date('2023-08-01T11:00:00'))
            
            return response.end(JSON.stringify(parkedCar))
        }

        if (url.includes('/checkout') && method === 'POST') {
            const checkout = new Checkout(parkingRepository)
            const plate = url.slice(-7)

            const parkedCar = await checkout.execute(plate, new Date('2023-08-01T15:00:00'))
            
            return response.end(JSON.stringify(parkedCar))
        }

        if (url.includes('/cars') && method === 'GET') {
            const cars = await parkingRepository.findAll()

            return response.end(JSON.stringify(cars))
        }

        response.end('Route not found')
    });
}

const PORT = 3000
createServer(handler).listen(PORT, () => {
    console.log(`API running at ${PORT}`);
})