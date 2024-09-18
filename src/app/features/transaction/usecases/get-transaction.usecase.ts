import { Result } from "../../../shared/contracts/result.contract";
import { Return } from "../../../shared/util/return.adpter";
import { UserRepository } from "../../user/repositories/user.repository";
import { TransactionRepository } from "../repositories/transaction.repository";


interface GetTransactionParams{
    userId: string,
    transactionId: string 
}

export class GetTransactionUseCase{
    constructor(
        private userRepository: UserRepository,
        private transacionRepository: TransactionRepository
    ){}

    public async execute( params: GetTransactionParams): Promise<Result>{
        const user = await this.userRepository.get(params.userId)

        if(!user){
            return Return.notFound('User')
        }

        const transaction = await this.transacionRepository.get(params.transactionId)

        if(!transaction){
            return Return.notFound('Transaction')
        }

        const result = transaction.toJson()

        return Return.success('Transaction successfully obteined', result)
    }
}