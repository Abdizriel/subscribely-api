import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AddressDto } from '@subscribely/contracts';
import { LoggerService } from '@subscribely/core';
import { AddressNotFoundException } from '@subscribely/exceptions';

import { AddressRepository } from '../../repositories';
import { DeleteAddressCommand } from '../impl';

@CommandHandler(DeleteAddressCommand)
export class DeleteAddressHandler
  implements ICommandHandler<DeleteAddressCommand>
{
  constructor(
    private readonly addressRepository: AddressRepository,
    private readonly loggerService: LoggerService,
  ) {
    this.loggerService.setContext(DeleteAddressHandler.name);
  }

  async execute(command: DeleteAddressCommand): Promise<AddressDto> {
    this.loggerService.log('DeleteAddressHandler#execute.command', {
      command,
    });

    const { id } = command;
    let address = await this.addressRepository.findById(id);
    if (!address) throw new AddressNotFoundException();

    address = await this.addressRepository.delete({
      id,
    });

    return address;
  }
}
