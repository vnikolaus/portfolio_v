import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { CurrentUser } from './useCases/auth/decorators/currentUser.decorator'
import { CurrentUserProps, MeProps } from './useCases/auth/typings/types'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('/me')
    me(@CurrentUser() user: CurrentUserProps): MeProps {
        return { me: user }
    }

    @Get('/me/cells')
    async myCells(@CurrentUser() user: CurrentUserProps) {
        const cells = await this.appService.getCells(user.id)
        return cells
    }
}
