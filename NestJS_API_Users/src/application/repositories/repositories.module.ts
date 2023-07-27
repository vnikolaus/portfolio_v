import { Module } from '@nestjs/common';
import { DbModule } from 'src/application/db/db.module';
import { UserRepository } from './implementations/user.repositories';

@Module({
  imports: [DbModule],
  controllers: [],
  providers: [UserRepository],
  exports: [UserRepository]
})
export class RepoModule {}
