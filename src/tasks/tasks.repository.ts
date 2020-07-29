import { Repository, EntityRepository } from "typeorm";

import { Task } from "./tasks.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./tasks-status.enum";
import { GetTaskFilter } from "./dto/get-tasks-filter.dto";
import { User } from "src/auth/user.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{

  async getTasks(
    filterDto: GetTaskFilter,
    user: User
  ): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('tasks');

    query.where('tasks.userId = :userId', { userId: user.id });

    if (status) {
      query.andWhere('tasks.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'tasks.title LIKE :search OR tasks.description LIKE :search', 
        { search: `%${search}%` }
      )
    }

    const tasks = query.getMany();
    return tasks;
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    user: User
  ): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;
    await task.save();

    delete task.user;

    return task;
  }
}