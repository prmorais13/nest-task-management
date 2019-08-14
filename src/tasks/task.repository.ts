import { Repository, EntityRepository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

import { TaskEntity } from './task.entity';
import { UserEntity } from '../auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {
  async getTasks(
    filterDto: GetTasksFilterDto,
    user: UserEntity,
  ): Promise<TaskEntity[]> {
    const { status, search } = filterDto;

    const query = this.createQueryBuilder('task');
    query.where('task.userId = :userId', { userId: user.id });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();
    if (tasks.length === 0) {
      throw new NotFoundException(
        `Não há tarefas para os critérios informados!`,
      );
    }
    return tasks;
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    user: UserEntity,
  ): Promise<TaskEntity> {
    const { title, description } = createTaskDto;

    const task = new TaskEntity();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;
    await task.save();

    delete task.user;
    return task;
  }
}
