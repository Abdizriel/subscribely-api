import { CreateAddressHandler } from './create-address.handler';
import { DeleteAddressHandler } from './delete-address.handler';
import { UpdateAddressHandler } from './update-address.handler';

export const CommandHandlers = [
  CreateAddressHandler,
  DeleteAddressHandler,
  UpdateAddressHandler,
];
