import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

@Exclude()
export class CountryDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  public id!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  public iso!: string;
}
