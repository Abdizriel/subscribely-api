import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

import { GetAddressesResponseDto } from '@subscribely/contracts';
import {
  JwtAuthGuard,
  LoggerService,
  TransformInterceptor,
} from '@subscribely/core';

import { AddressService } from '../../address/services';

@ApiTags('User')
@Controller('users')
@UseGuards(JwtAuthGuard)
export class AddressController {
  constructor(
    private loggerService: LoggerService,
    private addressService: AddressService,
  ) {
    this.loggerService.setContext(AddressController.name);
  }

  @UseInterceptors(new TransformInterceptor(GetAddressesResponseDto))
  @ApiBearerAuth()
  @Get(':id/addresses')
  @ApiQuery({ name: 'query', required: false })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  public async getAddressesByUserId(
    @Param('id') id: string,
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1,
    @Query('query') query?: string,
  ) {
    this.loggerService.info('AddressController#getAddressesByUserId.call');

    const result = await this.addressService.getAddressesByUserId({
      limit,
      page,
      query,
      userId: id,
    });

    this.loggerService.info(
      'AddressController#getAddressesByUserId.result',
      result,
    );

    return result;
  }
}
