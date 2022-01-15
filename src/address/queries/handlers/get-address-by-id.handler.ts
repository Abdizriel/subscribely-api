import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { AddressDto } from '@subscribely/contracts';
import { LoggerService } from '@subscribely/core';

import { AddressRepository } from '../../repositories';
import { GetAddressByIdQuery } from '../impl';

@QueryHandler(GetAddressByIdQuery)
export class GetAddressByIdHandler
  implements IQueryHandler<GetAddressByIdQuery>
{
  constructor(
    private readonly addressRepository: AddressRepository,
    private readonly loggerService: LoggerService,
  ) {
    this.loggerService.setContext(GetAddressByIdHandler.name);
  }

  async execute(command: GetAddressByIdQuery): Promise<AddressDto> {
    this.loggerService.log('GetAddressByIdHandler#execute.command', {
      command,
    });

    const { id } = command;
    const entry = await this.addressRepository.findById(id);

    return entry;
  }
}
