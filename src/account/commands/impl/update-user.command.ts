import { ICommand } from '@nestjs/cqrs';

import { UpdateUserDto } from '@subscribely/contracts';

export class UpdateUserCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly payload: UpdateUserDto,
  ) {}
}
