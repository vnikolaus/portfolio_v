import { Controller, Get } from '@nestjs/common'

type HomeInterface = {
    title: string
    message: string
}

@Controller()
export class AppController {
    @Get()
    getHome(): HomeInterface {
        return { 
            title: `Stocks & Index - API REST`,
            message: `Check our endpoints !`,
        }
    }
}
