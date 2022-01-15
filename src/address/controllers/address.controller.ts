import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

import {
  AddressDto,
  CreateAddressDto,
  GetAddressesResponseDto,
  UpdateAddressDto,
} from '@subscribely/contracts';
import {
  JwtAuthGuard,
  LoggerService,
  TransformInterceptor,
} from '@subscribely/core';

import { AddressService } from '../services';

@ApiTags('Address')
@Controller('addresses')
@UseGuards(JwtAuthGuard)
export class AddressController {
  constructor(
    private loggerService: LoggerService,
    private addressService: AddressService,
  ) {
    this.loggerService.setContext(AddressController.name);
  }

  @UseInterceptors(new TransformInterceptor(AddressDto))
  @ApiBearerAuth()
  @Get(':id')
  public async getAddress(@Param('id') id: string) {
    this.loggerService.info('AddressController#getAddress.call');

    const result = await this.addressService.getAddressById(id);

    this.loggerService.info('AddressController#getAddress.result', result);

    return result;
  }

  @UseInterceptors(new TransformInterceptor(GetAddressesResponseDto))
  @ApiBearerAuth()
  @Get()
  @ApiQuery({ name: 'query', required: false })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  public async getAddresses(
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1,
    @Query('query') query?: string,
  ) {
    this.loggerService.info('AddressController#getAddresses.call');

    const result = await this.addressService.getAddresses({
      limit,
      page,
      query,
    });

    this.loggerService.info('AddressController#getAddresses.result', result);

    return result;
  }

  @UseInterceptors(new TransformInterceptor(AddressDto))
  @ApiBearerAuth()
  @Patch(':id')
  public async updateAddress(
    @Request() res,
    @Param('id') id: string,
    @Body() payload: UpdateAddressDto,
  ) {
    this.loggerService.info('AddressController#updateAddress.call');

    const result = await this.addressService.updateAddress(
      id,
      payload,
      res.user.id,
    );

    this.loggerService.info('AddressController#updateAddress.result', result);

    return result;
  }

  @UseInterceptors(new TransformInterceptor(AddressDto))
  @ApiBearerAuth()
  @Post()
  public async createAddress(
    @Request() req,
    @Body() payload: CreateAddressDto,
  ) {
    this.loggerService.info('AddressController#createAddress.call');

    const result = await this.addressService.createAddress(
      payload,
      req.user.id,
    );

    this.loggerService.info('AddressController#createAddress.result', result);

    return result;
  }

  @UseInterceptors(new TransformInterceptor(AddressDto))
  @ApiBearerAuth()
  @Delete(':id')
  public async deleteAddress(@Request() req, @Param('id') id: string) {
    this.loggerService.info('AddressController#deleteAddress.call');

    const result = await this.addressService.deleteAddress(id, req.user.id);

    this.loggerService.info('AddressController#deleteAddress.result', result);

    return result;
  }
}
