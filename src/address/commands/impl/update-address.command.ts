import { ICommand } from '@nestjs/cqrs';

import { UpdateAddressDto } from '@subscribely/contracts';

export class UpdateAddressCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly payload: UpdateAddressDto,
    public readonly userId: string,
  ) {}
}
