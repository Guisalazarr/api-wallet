import { Result } from "../../../shared/contracts/result.contract";
import { Return } from "../../../shared/util/return.adpter";
import { UserRepository } from "../../user/repositories/user.repository";
import { TransactionRepository } from "../repositories/transaction.repository";


interface DeleteTransactionsParams {
    userId: string,
    transactionId: string
}

export class DeleteTransactionUseCase {
    constructor(
        private userRepository: UserRepository,
        private transactionRepository: TransactionRepository
    ) { }

    public async execute(params: DeleteTransactionsParams): Promise<Result> {
        const user = await this.userRepository.get(params.userId)

        if (!user) {
            return Return.notFound('User')
        }

        const transactionDeleted = await this.transactionRepository.delete(params.transactionId)

        if (transactionDeleted == 0) {
            return Return.notFound('Transaction')
        }

        const result = await this.transactionRepository.list({
            userId: user.id,
        })

        return Return.success(
            'Transaction succesfully deleted',
            result.map((transaction) => transaction.toJson())
        )
    }
}