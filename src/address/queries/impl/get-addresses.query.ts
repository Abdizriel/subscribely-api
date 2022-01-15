import { IQuery } from '@nestjs/cqrs';

import { GetAddressesDto } from '@subscribely/contracts';

export class GetAddressesQuery implements IQuery {
  constructor(public readonly payload: GetAddressesDto) {}
}
