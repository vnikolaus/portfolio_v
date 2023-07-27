import { Controller, Get } from '@nestjs/common';
import { isPublic } from './useCases/auth/decorators/isPublicDecorator';
import { CurrentUser } from './useCases/auth/decorators/currentUserDecorator';
import { User } from './useCases/user/entities/user.entity';

type HomePage = { message: String }
type MeProps = { me: User }

@Controller()
export class AppController {

  @isPublic()
  @Get()
  getHome(): HomePage {
    return { message: 'HomePage' };
  }

  @Get('me')
  getMe(@CurrentUser() user: User): MeProps {
    return { me: user }
  }
}
