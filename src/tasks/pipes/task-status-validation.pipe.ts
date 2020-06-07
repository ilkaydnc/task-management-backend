import { PipeTransform, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly alloweStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  transform(value: any): any {
    console.log('value', value);

    if (!this.isStatusValid(value))
      throw new BadRequestException(`${value} is an invalid status!`);

    return value;
  }

  private isStatusValid(status: any) {
    return this.alloweStatuses.indexOf(status) !== -1;
  }
}
