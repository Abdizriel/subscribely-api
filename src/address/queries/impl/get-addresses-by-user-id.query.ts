import { IQuery } from '@nestjs/cqrs';

import { GetAddressesByUserIdDto } from '@subscribely/contracts';

export class GetAddressesByUserIdQuery implements IQuery {
  constructor(public readonly payload: GetAddressesByUserIdDto) {}
}
