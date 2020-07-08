import { TaskStatus } from "../tasks.model";

export class GetTaskFilter {
  status: TaskStatus;
  search: string;
}