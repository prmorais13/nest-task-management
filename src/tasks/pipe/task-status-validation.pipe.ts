import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

import { TaskStatus } from '../task-status.enum';

@Injectable()
export class TaskStatusValidationPipe implements PipeTransform {
  readonly AllowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  transform(value: any, metadata: ArgumentMetadata) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} é um status inválido!`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.AllowedStatuses.indexOf(status);
    return idx !== -1;
  }
}
