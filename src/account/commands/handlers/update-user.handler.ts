import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserDto } from '@subscribely/contracts';
import { LoggerService } from '@subscribely/core';
import { UserNotFoundException } from '@subscribely/exceptions';

import { UserRepository } from '../../repositories';
import { UpdateUserCommand } from '../impl';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly loggerService: LoggerService,
  ) {
    this.loggerService.setContext(UpdateUserHandler.name);
  }

  async execute(command: UpdateUserCommand): Promise<UserDto> {
    this.loggerService.log('UpdateUserHandler#execute.command', {
      command,
    });

    const { id, payload } = command;

    let user = await this.userRepository.findOne({ id });
    if (!user) throw new UserNotFoundException();

    user = await this.userRepository.update({
      where: {
        id,
      },
      data: payload,
    });

    return user;
  }
}
