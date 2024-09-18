import { Response, Request, Router } from "express"
import { TransactionController } from "../util/transaction.factory"



export const transacionRoutes = () =>{
    const app = Router({
        mergeParams: true,
    })

    const controller = new TransactionController()

    app.get('/', (req: Request, res: Response) => 
        controller.listTransaction.list(req, res))

    app.get('/:transactionId', (req: Request, res: Response) => 
        controller.getTransaction.get(req, res))

    app.post('/', (req: Request, res: Response) => 
        controller.createTransaction.create(req, res))

    return app
}