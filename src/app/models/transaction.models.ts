import { v4 as createId } from 'uuid';
import { TransactionEntity } from '../shared/database/entities/transaction.entity';
import { User } from './user.models';

export enum TransactionType {
    Income = 'I',
    Outcome = 'O',
}

export class Transaction {

    private _id: string;

    constructor(
        private _title: string,
        private _value: number,
        private _type: TransactionType,
        private _date: Date,
        private _user: User


    ) {
        this._id = createId()
    }

    get id() { return this._id }
    get title() { return this._title }
    get value() { return this._value }
    get type() { return this._type }
    get date() { return this._date }
    get user() { return this._user }

    set title(title: string) {
        this._title = title
    }

    set value(value: number) {
        this._value = value
    }

    set type(type: TransactionType) {
        this._type = type
    }

    set date(date: Date) {
        this._date = date
    }


    toJson() {
        return {
            id: this._id,
            title: this._title,
            value: this._value,
            type: this._type,
            date: this._date
        }
    }

    public static create(row: TransactionEntity, user: User) {
        const transaction = new Transaction(row.title, row.value, row.type as TransactionType, row.date, user)
        transaction._id = row.id

        return transaction
    }

}