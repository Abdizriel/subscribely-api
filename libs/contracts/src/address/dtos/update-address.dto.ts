import { Exclude, Expose } from 'class-transformer';
import { IsISO31661Alpha2, IsOptional, IsString } from 'class-validator';

@Exclude()
export class UpdateAddressDto {
  @Expose()
  @IsString()
  @IsOptional()
  public name?: string;

  @Expose()
  @IsString()
  @IsOptional()
  public street?: string;

  @Expose()
  @IsString()
  @IsOptional()
  public number?: string;

  @Expose()
  @IsString()
  @IsOptional()
  public apartment?: string;

  @Expose()
  @IsString()
  @IsOptional()
  public city?: string;

  @Expose()
  @IsString()
  @IsOptional()
  public postalCode?: string;

  @Expose()
  @IsISO31661Alpha2()
  @IsOptional()
  public country?: string;
}
