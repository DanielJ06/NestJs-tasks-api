import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../tasks-status.enum";

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatusValues = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE,
    ];
    
    transform(value: any) {
        value = value.toUpperCase();

        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} is a invalid status`);
        }

        return value;
    }

    private isStatusValid(status: any) {
        const index = this.allowedStatusValues.indexOf(status);
        return index !== -1
    }
}