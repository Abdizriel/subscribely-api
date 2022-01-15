import { ICommand } from '@nestjs/cqrs';

import { ForgotPasswordDto } from '@subscribely/contracts';

export class ForgotPasswordCommand implements ICommand {
  constructor(public readonly payload: ForgotPasswordDto) {}
}
