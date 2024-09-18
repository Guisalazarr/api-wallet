import { UserRepository } from "../../user/repositories/user.repository";
import { CreateTransactionController } from "../controllers/create-transaction.controller";
import { GetTransactionController } from "../controllers/get-transaciont.controller";
import { ListTransactionController } from "../controllers/list-transaction.controller";
import { TransactionRepository } from "../repositories/transaction.repository";
import { CreateTransactionUsecase } from "../usecases/create-transaction.usecase";
import { GetTransactionUseCase } from "../usecases/get-transaction.usecase";
import { ListTransactionUseCase } from "../usecases/list-transactions.usecase";



export class TransactionController{
    private get userRepository(){
        return new UserRepository
    }

    private get transactionRepository(){
        return new TransactionRepository
    }

    public get listTransaction(){
        const listtUseCase = new ListTransactionUseCase(
            this.userRepository,
            this.transactionRepository
        )
        return new ListTransactionController(listtUseCase)
    }

    public get getTransaction(){
        const getUseCase = new GetTransactionUseCase(
            this.userRepository,
            this.transactionRepository
        )
        return new GetTransactionController(getUseCase)
    }


    public get createTransaction(){
        const createUseCase = new CreateTransactionUsecase(
            this.userRepository,
            this.transactionRepository
        )
        return new CreateTransactionController(createUseCase)
    }
}