import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { AddressDto } from '@subscribely/contracts';
import { LoggerService } from '@subscribely/core';

import { AddressFindOptions, AddressRepository } from '../../repositories';
import { GetAddressesByUserIdQuery } from '../impl';

@QueryHandler(GetAddressesByUserIdQuery)
export class GetAddressesByUserIdHandler
  implements IQueryHandler<GetAddressesByUserIdQuery>
{
  constructor(
    private readonly addressRepository: AddressRepository,
    private readonly loggerService: LoggerService,
  ) {
    this.loggerService.setContext(GetAddressesByUserIdHandler.name);
  }

  async execute(
    command: GetAddressesByUserIdQuery,
  ): Promise<[AddressDto[], number]> {
    this.loggerService.log('GetAddressesByUserIdHandler#execute.command', {
      command,
    });

    const { limit, page, query, userId } = command.payload;

    const filter: AddressFindOptions = {
      take: limit,
      skip: (page - 1) * limit,
    };

    if (query) {
      filter.where = {
        userId,
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
