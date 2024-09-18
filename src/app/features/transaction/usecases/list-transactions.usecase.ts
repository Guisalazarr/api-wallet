import { Transaction, TransactionType } from "../../../models/transaction.models";
import { Return } from "../../../shared/util/return.adpter";
import { UserRepository } from "../../user/repositories/user.repository";
import { TransactionRepository } from "../repositories/transaction.repository";


export interface ListTransactionsParams{
    userId: string,
    type?:TransactionType
}

export class ListTransactionUseCase{
    constructor(
        private userRepository: UserRepository,
        private transactionRepository: TransactionRepository
    ){}

    public async execute(params:ListTransactionsParams){
        const user = await this.userRepository.get(params.userId)

        if(!user){
            return Return.notFound('User')
        }

        const transactions = await this.transactionRepository.list({
            userId: params.userId,
            type: params.type
        })

        const result = transactions.map((transaction)=> transaction.toJson())

        return Return.success('Transactions successfully listed', result)
    }
}