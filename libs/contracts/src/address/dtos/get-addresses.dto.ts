import { Exclude } from 'class-transformer';

import { GenericFilterDto } from '../../common/generic-filter.dto';

@Exclude()
export class GetAddressesDto extends GenericFilterDto {}
