import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { TaskStatus } from './task-status.enum';

@Entity()
export class TaskEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;
}
