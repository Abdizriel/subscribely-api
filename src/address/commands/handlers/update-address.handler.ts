import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AddressDto } from '@subscribely/contracts';
import { LoggerService } from '@subscribely/core';
import { AddressNotFoundException } from '@subscribely/exceptions';

import {
  AddressRepository,
  CityRepository,
  CountryRepository,
} from '../../repositories';
import { UpdateAddressCommand } from '../impl';

@CommandHandler(UpdateAddressCommand)
export class UpdateAddressHandler
  implements ICommandHandler<UpdateAddressCommand>
{
  constructor(
    private readonly addressRepository: AddressRepository,
    private readonly cityRepository: CityRepository,
    private readonly countryRepository: CountryRepository,
    private readonly loggerService: LoggerService,
  ) {
    this.loggerService.setContext(UpdateAddressHandler.name);
  }

  async execute(command: UpdateAddressCommand): Promise<AddressDto> {
    this.loggerService.log('UpdateAddressHandler#execute.command', {
      command,
    });

    const { id, payload, userId } = command;
    const { city: cityName, country: countryIso, ...rest } = payload;

    const address = await this.addressRepository.findOne({
      id,
      userId,
    });
    if (!address) throw new AddressNotFoundException();

    let city = address.city;
    if (cityName) {
      city = await this.cityRepository.findByName(cityName);
      if (!city) {
        city = await this.cityRepository.create({
          name: cityName,
        });
      }
    }

    let country = address.country;
    if (countryIso) {
      country = await this.countryRepository.findByIso(countryIso);
      if (!country) {
        country = await this.countryRepository.create({
          iso: countryIso,
        });
      }
    }

    return this.addressRepository.update({
      where: {
        id,
      },
      data: {
        ...address,
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
      },
    });
  }
}
