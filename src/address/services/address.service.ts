import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import {
  AddressDto,
  CreateAddressDto,
  GetAddressesByUserIdDto,
  GetAddressesDto,
  UpdateAddressDto,
} from '@subscribely/contracts';
import { PaginatedDataDto } from '@subscribely/contracts/common';
import { LoggerService } from '@subscribely/core';

import {
  CreateAddressCommand,
  DeleteAddressCommand,
  UpdateAddressCommand,
} from '../commands/impl';
import {
  GetAddressByIdQuery,
  GetAddressesByUserIdQuery,
  GetAddressesQuery,
} from '../queries/impl';

@Injectable()
export class AddressService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly loggerService: LoggerService,
  ) {
    this.loggerService.setContext(AddressService.name);
  }

  public async getAddressById(id: string): Promise<AddressDto | null> {
    this.loggerService.info('AddressService#getAddressById.call', {
      id,
    });

    const result = await this.queryBus.execute<
      GetAddressByIdQuery,
      AddressDto | null
    >(new GetAddressByIdQuery(id));

    this.loggerService.info('AddressService#getAddressById.result', result);

    return result;
  }

  public async getAddressesByUserId(
    payload: GetAddressesByUserIdDto,
  ): Promise<PaginatedDataDto<AddressDto>> {
    this.loggerService.info('AddressService#getAddressesByUserId.call');

    const { limit, page } = payload;

    const result = await this.queryBus.execute<
      GetAddressesByUserIdQuery,
      [AddressDto[], number]
    >(new GetAddressesByUserIdQuery(payload));

    this.loggerService.info(
      'AddressService#getAddressesByUserId.result',
      result,
    );

    return {
      items: result[0],
      meta: {
        limit,
        page,
        count: result[1],
      },
    };
  }

  public async getAddresses(
    payload: GetAddressesDto,
  ): Promise<PaginatedDataDto<AddressDto>> {
    this.loggerService.info('AddressService#getAddresses.call');

    const { limit, page } = payload;

    const result = await this.queryBus.execute<
      GetAddressesQuery,
      [AddressDto[], number]
    >(new GetAddressesQuery(payload));

    this.loggerService.info('AddressService#getAddresses.result', result);

    return {
      items: result[0],
      meta: {
        limit,
        page,
        count: result[1],
      },
    };
  }

  public async createAddress(
    payload: CreateAddressDto,
    userId: string,
  ): Promise<AddressDto> {
    this.loggerService.info('AddressService#createAddress.call', {
      payload,
    });

    const result = await this.commandBus.execute<
      CreateAddressCommand,
      AddressDto
    >(new CreateAddressCommand(payload, userId));

    this.loggerService.info('AddressService#createAddress.result', result);

    return result;
  }

  public async updateAddress(
    id: string,
    payload: UpdateAddressDto,
    userId: string,
  ): Promise<AddressDto> {
    this.loggerService.info('AddressService#updateAddress.call', {
      payload,
    });

    const result = await this.commandBus.execute<
      UpdateAddressCommand,
      AddressDto
    >(new UpdateAddressCommand(id, payload, userId));

    this.loggerService.info('AddressService#updateAddress.result', result);

    return result;
  }

  public async deleteAddress(id: string, userId: string): Promise<AddressDto> {
    this.loggerService.info('AddressService#deleteAddress.call', {
      id,
    });

    const result = await this.commandBus.execute<
      DeleteAddressCommand,
      AddressDto
    >(new DeleteAddressCommand(id, userId));

    this.loggerService.info('AddressService#deleteAddress.result', result);

    return result;
  }
}
