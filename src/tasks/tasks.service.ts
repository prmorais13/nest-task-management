import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid/v1';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskbyId(id: string): Task {
    return this.tasks.find(task => task.id === id);
  }

  createTask(createTaskdto: CreateTaskDto): Task {
    const { title, description } = createTaskdto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  updateTaskstatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskbyId(id);
    task.status = status;
    return task;
  }
}
