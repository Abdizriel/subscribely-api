import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { AddressDto } from '@subscribely/contracts';
import { LoggerService } from '@subscribely/core';

import { AddressFindOptions, AddressRepository } from '../../repositories';
import { GetAddressesQuery } from '../impl';

@QueryHandler(GetAddressesQuery)
export class GetAddressesHandler implements IQueryHandler<GetAddressesQuery> {
  constructor(
    private readonly addressRepository: AddressRepository,
    private readonly loggerService: LoggerService,
  ) {
    this.loggerService.setContext(GetAddressesHandler.name);
  }

  async execute(command: GetAddressesQuery): Promise<[AddressDto[], number]> {
    this.loggerService.log('GetAddressesHandler#execute.command', {
      command,
    });

    const { limit, page, query } = command.payload;

    const filter: AddressFindOptions = {
      take: limit,
      skip: (page - 1) * limit,
    };

    if (query) {
      filter.where = {
        OR: [
          {
            name: { contains: query },
          },
          {
            street: { contains: query },
          },
          {
            number: { contains: query },
          },
          {
            apartment: { contains: query },
          },
          {
            postalCode: { contains: query },
          },
        ],
      };
    }

    const entries = await this.addressRepository.find(filter);
    const count = await this.addressRepository.count(filter);

    return [entries, count];
  }
}
