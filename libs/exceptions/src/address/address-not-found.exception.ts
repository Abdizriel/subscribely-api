import { BadRequestException } from '@nestjs/common';

export class AddressNotFoundException extends BadRequestException {
  constructor(error?: string) {
    super({
      type: 'ADDRESS_NOT_FOUND',
      message: 'error.address.not_found',
      error,
    });
  }
}
