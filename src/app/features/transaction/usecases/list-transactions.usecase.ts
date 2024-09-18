import { Transaction, TransactionType } from "../../../models/transaction.models";
import { Return } from "../../../shared/util/return.adpter";
import { UserRepository } from "../../user/repositories/user.repository";
import { TransactionRepository } from "../repositories/transaction.repository";
import { sumTransactionsValues } from "../util/sum.transactions";


export interface ListTransactionsParams {
    userId: string,
    type?: TransactionType
}

export class ListTransactionUseCase {
    constructor(
        private userRepository: UserRepository,
        private transactionRepository: TransactionRepository
    ) { }

    public async execute(params: ListTransactionsParams) {
        const user = await this.userRepository.get(params.userId)

        if (!user) {
            return Return.notFound('User')
        }

        let transactions = await this.transactionRepository.list({
            userId: params.userId,
            type: params.type
        })

        let income = sumTransactionsValues(
            transactions,
            TransactionType.Income
        );

        let outcome = sumTransactionsValues(
            transactions,
            TransactionType.Outcome
        );


        const result = {
            transactions: transactions.map((transaction) => transaction.toJson()),
            balance: {
                income,
                outcome,
                reserve: income * 0.30,
                total: income - outcome
            }
        }

        return Return.success(
            'Transactions successfully listed',
            result,
        )
    }
}