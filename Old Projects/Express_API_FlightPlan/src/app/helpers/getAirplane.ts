import { faker } from '@faker-js/faker'

const getAirplane = async (array) => {
    try {
        let selectedAirplane = ''
        let t = true

        while (t) {
            const { name } = await faker.airline.airplane()

            array.forEach((model) => {
                if (name.includes(model)) {
                    selectedAirplane = name
                    t = false
                }
            })
        }

        return selectedAirplane
    } catch (err) {
        console.error(err)
    }
}

export { getAirplane }
