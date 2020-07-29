import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilter } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './tasks.entity';
import { TaskStatus } from './tasks-status.enum';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  constructor(private tasksServices: TasksService) {}

  @Get()
    getTasks(
      @Query(ValidationPipe) filterDto: GetTaskFilter,
      @GetUser() user: User,  
    ): Promise<Task[]> {
      return this.tasksServices.getTasks(filterDto, user);
    }

  @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
      return this.tasksServices.getTaskById(id);
    }

  @Post()
  @UsePipes(ValidationPipe)
    createNewTask(
      @Body() createTaskDto: CreateTaskDto,
      @GetUser() user: User,
    ): Promise<Task> {
      return this.tasksServices.createNewTask(createTaskDto, user);
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
