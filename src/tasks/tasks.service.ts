import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import * as uuid from 'uuid/v1';
// import { Task } from './task.model';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { TaskEntity } from './task.entity';
import { UserEntity } from './../auth/user.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  // private tasks: Task[] = [];

  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getTasks(
    filterDto: GetTasksFilterDto,
    user: UserEntity,
  ): Promise<TaskEntity[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }

  async getTaskbyId(id: number, user: UserEntity): Promise<TaskEntity> {
    const found = await this.taskRepository.findOne(id, {
      where: { id, userId: user.id },
    });
    if (!found) {
      throw new NotFoundException(`Tarefa com ID: ${id} não encontrada!`);
    }
    return found;
  }
  // getTaskbyId(id: string): Task {
  //   const found = this.tasks.find(task => task.id === id);
  //   if (!found) {
  //     throw new NotFoundException(`Tarefa com ID: ${id} não encontrada!`);
  //   }
  //   return found;
  // }
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  async createTask(
    createTaskdto: CreateTaskDto,
    user: UserEntity,
  ): Promise<TaskEntity> {
    return this.taskRepository.createTask(createTaskdto, user);
  }

  // createTask(createTaskdto: CreateTaskDto): Task {
  //   const { title, description } = createTaskdto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }

  async deleteTask(id: number, user: UserEntity): Promise<void> {
    const result = await this.taskRepository.delete({ id, userId: user.id });
    if (result.affected === 0) {
      throw new NotFoundException(`Tarefa com ID: ${id} não encontrada!`);
    }
  }
  // deleteTask(id: string): void {
  //   const found = this.getTaskbyId(id);
  //   this.tasks = this.tasks.filter(task => task.id !== found.id);
  // }

  async updateTaskStatus(
    id: number,
    status: TaskStatus,
    user: UserEntity,
  ): Promise<TaskEntity> {
    const task = await this.getTaskbyId(id, user);
    task.status = status;
    task.save();
    return task;
  }
  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskbyId(id);
  //   task.status = status;
  //   return task;
  // }

  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter(task => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter(
  //       task =>
  //         task.title.includes(search) || task.description.includes(search),
  //     );
  //   }
  //   return tasks;
  // }
}
