import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

import { GenericFilterDto } from '../../common/generic-filter.dto';

@Exclude()
export class GetAddressesByUserIdDto extends GenericFilterDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  public userId!: string;
}
