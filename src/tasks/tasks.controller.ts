import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';

import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilter } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './tasks.entity';
import { TaskStatus } from './tasks-status.enum';

@Controller('tasks')
export class TasksController {
  constructor(private tasksServices: TasksService) {}

  // @Get()
  //   getTasks(@Query(ValidationPipe) filterDto: GetTaskFilter): Task[] {
  //     return this.tasksServices.getTasks(filterDto);
  //   }

  @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
      return this.tasksServices.getTaskById(id);
    }

  @Post()
  @UsePipes(ValidationPipe)
    createNewTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
      return this.tasksServices.createNewTask(createTaskDto);
    }

  @Patch('/:id/status')
    updateTaskStatus(@Param('id', ParseIntPipe) id: number, @Body('status', TaskStatusValidationPipe) status: TaskStatus): Promise<Task> {
      return this.tasksServices.updateTaskStatus(id, status);
    }

  @Delete('/:id')
    deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
      return this.tasksServices.deleteTask(id);
    }
}
