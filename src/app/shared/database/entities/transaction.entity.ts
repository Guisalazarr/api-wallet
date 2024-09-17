import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { TransactionType } from '../../../models/transaction.models';

@Entity('transaction')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    value: number;

    @Column({
        enum: TransactionType
    })
    type: string;

    @CreateDateColumn({
        name: 'created_at',
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
    })
    updatedAt: Date;

    @Column({
        name: 'user_id',
    })
    idUser: string

    @ManyToOne(()=> UserEntity, {
        eager: true,
    })
    @JoinColumn({name: 'id_user'})
    user: UserEntity
}
