import { config } from 'dotenv';
config()

import { DataSource } from 'typeorm';
import { User } from '../useCases/user/entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Database {
  async connection() {
    const AppDataSource = new DataSource({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PWD,
      database: process.env.DB_DATABASE,
      entities: [User],
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
    });

    return await AppDataSource.initialize()
  }
}