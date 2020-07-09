import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilter } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getTasks({ status, search }: GetTaskFilter): Task[] {
    let tasks = status ? this.tasks.filter(
      (task: Task) => task.status === status) : this.tasks;
      if(search) {
        tasks = tasks.filter(task =>
          task.title.includes(search) ||
          task.description.includes(search)
        )
      }

    return tasks;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find(task => task.id === id);

    if (!found) {
      throw new NotFoundException(`Task ${id} not found`)
    }

    return found;
  } 

  createNewTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  updateTask(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  deleteTask(id: string): void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter(task => task.id !== found.id);
  }
}
