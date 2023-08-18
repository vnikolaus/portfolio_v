import { Injectable } from '@nestjs/common'
import { VeiculosRepository } from 'src/api/repositories/implementations/Veiculos.repository'

@Injectable()
export class VeiculosService {
    constructor(private readonly repository: VeiculosRepository) {}

    async listVeiculos() {
        const veiculos = await this.repository.list()
        return veiculos
    }
}
