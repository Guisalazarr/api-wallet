import { Database } from "../../../../main/database/database.connection";
import { Transaction } from "../../../models/transaction.models";
import { TransactionEntity } from "../../../shared/database/entities/transaction.entity";
import { UserRepository } from "../../user/repositories/user.repository";

export class TransactionRepository{
    private repository = Database.connection.getRepository(TransactionEntity)

    public async get(transactionId: string){
        const result = await this.repository.findOneBy({
            id: transactionId
        })

        if(!result) {return undefined}

        return this.mapRowToModel(result)
    }

    public async create(transaction: Transaction){
        const transactionEntity = this.repository.create({
            id: transaction.id,
            title: transaction.title,
            value: transaction.value,
            type: transaction.type,
            idUser:transaction.user.id
        })

        await this.repository.save(transactionEntity)
    }


    private mapRowToModel(row:TransactionEntity){
        const user = UserRepository.mapRowToModel(row.user)

        return Transaction.create(row, user)
    }
}