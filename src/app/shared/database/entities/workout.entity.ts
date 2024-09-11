import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('workout')
export class WorkoutEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({nullable: false})
    repetitions: number;

    @Column({nullable: false})
    series: number;

    @Column({nullable: false})
    weeks: number;

    @Column({nullable: false})
    cardio: string;

    @Column({nullable: false})
    description: string;

    @CreateDateColumn({
        name: 'created_at',
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
    })
    updatedAt: Date;

    @Column({
        name: "id_user",
      })
      idUser: string;
    
      @ManyToOne(() => UserEntity, {
        eager: true,
      })
      @JoinColumn({ name: "id_user" })
      user: UserEntity;
}