import { v4 as createId } from 'uuid';

export enum TransactionType {
    Income = 'I',
    Outcome = 'O',
}

export class Transaction{

    private _id: string;

    constructor(
        private _title: string,
        private _value: number,
        private _type: TransactionType,
        private _userId: string


    ){
        this._id = createId()
    }
    
    get id() {return this._id}
    get title(){return this._title}
    get value(){return this._value}
    get type(){return this._type}
    get userId(){ return this._userId}

    set title(title: string){
        this._title = title
    }

    set value(value: number){
        this._value = value
    }

    set type(type: TransactionType){
        this._type = type
    }


    toJson(){
        return{
            id: this._id,
            title: this._title,
            value: this._value,
            type: this._value
        }
    }

}