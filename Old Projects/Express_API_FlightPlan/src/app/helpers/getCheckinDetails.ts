import { faker } from '@faker-js/faker'
import { getAirplane } from './getAirplane'

const getCheckinDetails = async (distance) => {
    let airplane = ''
    let seat = ''
    let arrModels = []

    if (distance < 2000) {
        arrModels = ['Embraer', 'Regional', 'Legacy']
        airplane = await getAirplane(arrModels)
        seat = await faker.airline.seat({ aircraftType: 'regional' })
    }

    if (distance > 2000 && distance < 5000) {
        arrModels = ['B737', '727', 'A318', 'A319', 'A320']
        airplane = await getAirplane(arrModels)
        seat = await faker.airline.seat({ aircraftType: 'narrowbody' })
    }

    if (distance > 5000 && distance < 8000) {
        arrModels = ['B757', 'B767', 'A330', 'MD11']
        airplane = await getAirplane(arrModels)
        seat = await faker.airline.seat({ aircraftType: 'widebody' })
    }

    if (distance > 8000) {
        arrModels = ['B787', 'B777', 'A350', 'B747', 'A380']
        airplane = await getAirplane(arrModels)
        seat = await faker.airline.seat({ aircraftType: 'widebody' })
    }

    return {
        airplane,
        seat,
    }
}

export { getCheckinDetails }
