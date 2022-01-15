import { ICommand } from '@nestjs/cqrs';

import { CreateUserDto } from '@subscribely/contracts';

export class CreateUserCommand implements ICommand {
  constructor(public readonly payload: CreateUserDto) {}
}
