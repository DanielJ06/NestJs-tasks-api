import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../tasks-status.enum';

export class GetTaskFilter {
  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  status: TaskStatus;
  
  @IsOptional()
  @IsNotEmpty()
  search: string;
}