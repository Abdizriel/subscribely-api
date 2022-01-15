import { Exclude, Expose, Type } from 'class-transformer';
import {
  IsISO31661Alpha2,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { CityDto } from './city.dto';
import { CountryDto } from './country.dto';

@Exclude()
export class AddressDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  public id!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  public name!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  public street!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  public number!: string;

  @Expose()
  @IsString()
  @IsOptional()
  public apartment?: string;

  @Expose()
  @IsObject()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CityDto)
  public city!: CityDto;

  @Expose()
  @IsString()
  @IsNotEmpty()
  public postalCode!: string;

  @Expose()
  @IsISO31661Alpha2()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CountryDto)
  public country!: CountryDto;
}
