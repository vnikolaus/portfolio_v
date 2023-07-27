import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/application/repositories/implementations/user.repositories';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

export type UserRepo = Promise<Repository<User>>

const SALT = +process.env.SALT

@Injectable()
export class UserService {
  private userRepo: UserRepo

  constructor(userRepository: UserRepository) {
    this.userRepo = userRepository.exec()
  }

  async create({ name, email, password }: CreateUserDto) {
    const db = await this.userRepo
    const userAlreadyExists = await this.findByEmail(email)

    if(userAlreadyExists) return { message: `Users already exists` }

    const hashedPassword = await bcrypt.hash(password, SALT)
    const newUser = { name, email, password: hashedPassword }

    db.save(newUser)

    return {
      ...newUser,
      password: undefined
    }
  }

  async findByPk(id: number) {
    const user = await (await this.userRepo).findOne({ where: { id: id } })
    return user
  }

  async findByEmail(email: string) {
    const user = await (await this.userRepo).findOne({ where: { email: email } })
    return user
  }

  async findAll() {
    const users = await (await this.userRepo).find()
    return users
  }
}
