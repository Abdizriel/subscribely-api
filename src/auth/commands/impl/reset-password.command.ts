import { ICommand } from '@nestjs/cqrs';

import { ResetPasswordDto } from '@subscribely/contracts';

export class ResetPasswordCommand implements ICommand {
  constructor(public readonly payload: ResetPasswordDto) {}
}
