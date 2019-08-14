import {
  Controller,
  Get,
  Body,
  Post,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// import { Task } from './task.model';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './pipe/task-status-validation.pipe';
import { TaskEntity } from './task.entity';
import { UserEntity } from '../auth/user.entity';
import { TaskStatus } from './task-status.enum';
import { GetUser } from '../auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
    @GetUser() user: UserEntity,
  ): Promise<TaskEntity[]> {
    return this.tasksService.getTasks(filterDto, user);
  }
  // @Get()
  // getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.tasksService.getTasksWithFilters(filterDto);
  //   } else {
  //     return this.tasksService.getAllTasks();
  //   }
  // }

  @Get(':id')
  getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: UserEntity,
  ): Promise<TaskEntity> {
    return this.tasksService.getTaskbyId(id, user);
  }
  // @Get(':id')
  // getTaskById(@Param('id') id: string): Task {
  //   return this.tasksService.getTaskbyId(id);
  // }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: UserEntity,
  ): Promise<TaskEntity> {
    return this.tasksService.createTask(createTaskDto, user);
  }
  // @Post()
  // @UsePipes(ValidationPipe)
  // createTask(@Body() createTaskDto: CreateTaskDto) {
  //   return this.tasksService.createTask(createTaskDto);
  // }

  @Delete(':id')
  deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: UserEntity,
  ): Promise<void> {
    return this.tasksService.deleteTask(id, user);
  }
  // @Delete(':id')
  // deleteTask(@Param('id') id: string): void {
  //   return this.tasksService.deleteTask(id);
  // }

  @Patch(':id/status')
  updateTaskstatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @GetUser() user: UserEntity,
  ): Promise<TaskEntity> {
    return this.tasksService.updateTaskStatus(id, status, user);
  }
  // @Patch(':id/status')
  // updateTaskstatus(
  //   @Param('id') id: string,
  //   @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  // ): Task {
  //   return this.tasksService.updateTaskStatus(id, status);
  // }
}
