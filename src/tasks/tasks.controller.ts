import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilter } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private tasksServices: TasksService) {}

  @Get()
    getTasks(@Query() filterDto: GetTaskFilter): Task[] {
      return this.tasksServices.getTasks(filterDto);
    }

  @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
      return this.tasksServices.getTaskById(id);
    }

  @Post()
  @UsePipes(ValidationPipe)
    createNewTask(@Body() createTaskDto: CreateTaskDto): Task {
      return this.tasksServices.createNewTask(createTaskDto);
    }

  @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string, @Body('status', TaskStatusValidationPipe) status: TaskStatus): Task {
      return this.tasksServices.updateTask(id, status);
    }

  @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
      this.tasksServices.deleteTask(id);
    }
}
