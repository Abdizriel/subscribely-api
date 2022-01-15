import { IQuery } from '@nestjs/cqrs';

import { GetUsersDto } from '@subscribely/contracts';

export class GetUsersQuery implements IQuery {
  constructor(public readonly payload: GetUsersDto) {}
}
