import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AddressDto } from '@subscribely/contracts';
import { LoggerService } from '@subscribely/core';

import {
  AddressRepository,
  CityRepository,
  CountryRepository,
} from '../../repositories';
import { CreateAddressCommand } from '../impl';

@CommandHandler(CreateAddressCommand)
export class CreateAddressHandler
  implements ICommandHandler<CreateAddressCommand>
{
  constructor(
    private readonly addressRepository: AddressRepository,
    private readonly cityRepository: CityRepository,
    private readonly countryRepository: CountryRepository,
    private readonly loggerService: LoggerService,
  ) {
    this.loggerService.setContext(CreateAddressHandler.name);
  }

  async execute(command: CreateAddressCommand): Promise<AddressDto> {
    this.loggerService.log('CreateAddressHandler#execute.command', {
      command,
    });

    const { userId, payload } = command;
    const { city: cityName, country: countryIso, ...rest } = payload;

    let city = await this.cityRepository.findByName(cityName);
    if (!city) {
      city = await this.cityRepository.create({
        name: cityName,
      });
    }

    let country = await this.countryRepository.findByIso(countryIso);
    if (!country) {
      country = await this.countryRepository.create({
        iso: countryIso,
      });
    }

    return this.addressRepository.create({
      ...rest,
      city: {
        connect: {
          id: city.id,
        },
      },
      country: {
        connect: {
          id: country.id,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    });
  }
}
