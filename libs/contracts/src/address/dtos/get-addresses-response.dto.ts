import { Exclude, Expose, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { PaginatedMeta } from '../../common';
import { AddressDto } from './address.dto';

@Exclude()
export class GetAddressesResponseDto {
  @Expose()
  @IsObject({ each: true })
  @IsNotEmpty()
  @ApiProperty()
  @ValidateNested()
  @Type(() => AddressDto)
  readonly items!: AddressDto[];

  @Expose()
  @IsObject()
  @IsOptional()
  @ApiProperty()
  @ValidateNested()
  @Type(() => PaginatedMeta)
  readonly meta!: PaginatedMeta;
}
