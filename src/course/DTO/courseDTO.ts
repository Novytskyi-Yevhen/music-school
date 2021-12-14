import { IdDTO } from 'src/shared/dto';
import { IsNotEmpty, ValidateNested, IsNotEmptyObject } from 'class-validator';

import { Type } from 'class-transformer';
export class courseDTO {
  @IsNotEmpty()
  name: string;

  @ValidateNested()
  @Type(() => IdDTO)
  @IsNotEmptyObject()
  service: IdDTO;
}
