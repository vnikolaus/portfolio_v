import { Transaction } from "../../domain/entities/Transaction";
import { Registry } from "../../infra/registry/Registry";
import { TransactionRepository } from "../repositories/TransactionRepository";

export class CloseApprovedTransaction {
    private transactionRepository: TransactionRepository
    
    constructor(readonly registry: Registry) {
        this.transactionRepository = registry.inject('transactionRepository')
    }
    
    async execute({ id, status }: Transaction) {
        await this.transactionRepository.update(id, status)
    }
}