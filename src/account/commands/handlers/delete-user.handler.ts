import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserDto } from '@subscribely/contracts';
import { LoggerService } from '@subscribely/core';
import { UserNotFoundException } from '@subscribely/exceptions';

import { UserRepository } from '../../repositories';
import { DeleteUserCommand } from '../impl';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly loggerService: LoggerService,
  ) {
    this.loggerService.setContext(DeleteUserHandler.name);
  }

  async execute(command: DeleteUserCommand): Promise<UserDto> {
    this.loggerService.log('DeleteUserHandler#execute.command', {
      command,
    });

    const { id } = command;
    let user = await this.userRepository.findOne({
      id,
    });
    if (!user) throw new UserNotFoundException();

    user = await this.userRepository.delete({
      id,
    });

    return user;
  }
}
