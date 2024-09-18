import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../../../shared/util/http-response.adapter";
import { TransactionType } from "../../../models/transaction.models";

export class TransactionValidator {
    public static validateCreateFields(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { title, value, type } = req.body

            if (!title) {
                return ApiResponse.notProvided(res, 'Title')
            }

            if (!value) {
                return ApiResponse.notProvided(res, 'Value')
            }

            if (!type) {
                return ApiResponse.notProvided(res, 'Type')
            }

            next()
        } catch (error: any) {
            return ApiResponse.serverError(res, error)
        }
    }

    public static validateTypeTransaction(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { type } = req.body;

            const allowedType = Object.values(TransactionType);

            if (!allowedType.includes(type)) {
                return ApiResponse.invalidField(res, 'Type');
            }

            next();
        } catch (error: any) {
            return ApiResponse.serverError(res, error);
        }
    }
}