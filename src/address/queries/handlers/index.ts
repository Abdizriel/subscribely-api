import { GetAddressByIdHandler } from './get-address-by-id.handler';
import { GetAddressesByUserIdHandler } from './get-addresses-by-user-id.handler';
import { GetAddressesHandler } from './get-addresses.handler';

export const QueryHandlers = [
  GetAddressByIdHandler,
  GetAddressesByUserIdHandler,
  GetAddressesHandler,
];
