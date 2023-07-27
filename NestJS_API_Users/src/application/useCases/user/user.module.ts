import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DbModule } from 'src/application/db/db.module';
import { RepoModule } from 'src/application/repositories/repositories.module';

@Module({
  imports: [RepoModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
