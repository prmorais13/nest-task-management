import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Unique,
  OneToMany,
} from 'typeorm';

import { TaskEntity } from '../tasks/task.entity';

import * as bcrypt from 'bcryptjs';

@Entity()
@Unique(['username'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(type => TaskEntity, task => task.user, { eager: true })
  tasks: TaskEntity[];

  async validadePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
