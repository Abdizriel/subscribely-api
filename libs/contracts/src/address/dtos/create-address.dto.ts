import { Exclude, Expose } from 'class-transformer';
import {
  IsISO31661Alpha2,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

@Exclude()
export class CreateAddressDto {
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
  @IsString()
  @IsNotEmpty()
  public city!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  public postalCode!: string;

  @Expose()
  @IsISO31661Alpha2()
  @IsNotEmpty()
  public country!: string;
}
