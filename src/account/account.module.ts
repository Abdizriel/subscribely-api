import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AddressModule } from '../address/address.module';
import { AddressService } from '../address/services';
import { CommandHandlers } from './commands/handlers';
import { AddressController, UserController } from './controllers';
import { QueryHandlers } from './queries/handlers';
import { UserRepository } from './repositories';
import { UserService } from './services';

@Module({
  imports: [CqrsModule, AddressModule],
  providers: [
    AddressService,
    ...CommandHandlers,
    ...QueryHandlers,
    UserService,
    UserRepository,
  ],
  controllers: [UserController, AddressController],
  exports: [UserService],
})
export class AccountModule {}
