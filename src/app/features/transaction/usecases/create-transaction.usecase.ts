import { Transaction, TransactionType } from "../../../models/transaction.models";
import { Result } from "../../../shared/contracts/result.contract";
import { Return } from "../../../shared/util/return.adpter";
import { UserRepository } from "../../user/repositories/user.repository";
import { TransactionRepository } from "../repositories/transaction.repository";


interface CreateTransactionParams {
    userId: string,
    title: string,
    value: number,
    date: Date,
    type: TransactionType
}

export class CreateTransactionUsecase {
    constructor(
        private userRepository: UserRepository,
        private transactionRepository: TransactionRepository
    ) { }

    public async execute(params: CreateTransactionParams): Promise<Result> {
        const user = await this.userRepository.get(params.userId);

        if (!user) {
            return Return.notFound('User')
        }

        const transaction = new Transaction(params.title, params.value, params.type, params.date, user)
        await this.transactionRepository.create(transaction)

        return Return.create('Transaction', transaction.toJson())
    }
}