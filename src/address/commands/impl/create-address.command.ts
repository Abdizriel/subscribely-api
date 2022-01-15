import { ICommand } from '@nestjs/cqrs';

import { CreateAddressDto } from '@subscribely/contracts';

export class CreateAddressCommand implements ICommand {
  constructor(
    public readonly payload: CreateAddressDto,
    public readonly userId: string,
  ) {}
}
