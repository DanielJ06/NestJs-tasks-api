import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksServices: TasksService) {}

  @Get()
    getAllTasks(): Promise<Task[]> {
      return this.tasksServices.getAllTasks();
    }

  @Get('/:id')
    getTaskById(@Param('id') id: string): Promise<Task> {
      return this.tasksServices.getTaskById(id);
    }

  @Post()
    createNewTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
      return this.tasksServices.createNewTask(createTaskDto);
    }
}
