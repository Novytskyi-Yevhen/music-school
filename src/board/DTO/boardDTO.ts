import { IsNotEmpty, ValidateNested, IsNotEmptyObject } from 'class-validator';

import { Type } from 'class-transformer';
import { IdDTO } from 'src/shared/dto';
export class boardDTO {
  @IsNotEmpty()
  name: string;

  @ValidateNested()
  @Type(() => IdDTO)
  @IsNotEmptyObject()
  task: IdDTO;
}
