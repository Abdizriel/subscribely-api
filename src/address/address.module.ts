import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CommandHandlers } from './commands/handlers';
import { AddressController } from './controllers';
import { QueryHandlers } from './queries/handlers';
import {
  AddressRepository,
  CityRepository,
  CountryRepository,
} from './repositories';
import { AddressService } from './services';

@Module({
  imports: [CqrsModule],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    AddressService,
    AddressRepository,
    CityRepository,
    CountryRepository,
  ],
  controllers: [AddressController],
  exports: [AddressService],
})
export class AddressModule {}
