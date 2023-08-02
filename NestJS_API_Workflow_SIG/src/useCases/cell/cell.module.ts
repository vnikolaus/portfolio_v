import { Module } from '@nestjs/common'
import { CellService } from './cell.service'
import { DatabaseModule } from 'src/database/database.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Cell } from 'src/entities/cell.entity'
import { CellController } from './cell.controller'

@Module({
    imports: [DatabaseModule, TypeOrmModule.forFeature([Cell])],
    controllers: [CellController],
    providers: [CellService],
    exports: [CellService],
})
export class CellModule {}
