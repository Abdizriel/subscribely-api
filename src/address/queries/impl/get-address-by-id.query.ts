import { IQuery } from '@nestjs/cqrs';

export class GetAddressByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
