import { Module } from '@nestjs/common';
import { Database } from 'src/application/db/db.datasource';

@Module({
  controllers: [],
  providers: [Database],
  exports: [Database]
})
export class DbModule {}
