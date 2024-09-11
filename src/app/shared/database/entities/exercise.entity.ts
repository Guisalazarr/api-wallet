import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { WorkoutEntity } from './workout.entity';

@Entity('exercise')
export class ExerciseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ default: 0})
    weight: number

    @CreateDateColumn({
        name: 'created_at',
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
    })
    updatedAt: Date;

    @Column({
        name: "id_workout",
      })
      idWorkout: string;
    
      @ManyToOne(() => WorkoutEntity, {
        eager: true,
      })
      @JoinColumn({ name: "id_workout" })
      workout: WorkoutEntity;
}