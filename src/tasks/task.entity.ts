import { UserEntity } from './../auth/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
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

  @ManyToOne(type => UserEntity, user => user.tasks, { eager: false })
  user: UserEntity;

  @Column()
  userId: number;
}
