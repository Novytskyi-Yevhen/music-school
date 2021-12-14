import {
  IsNotEmpty,
  ValidateNested,
  IsNotEmptyObject,
  IsString,
} from 'class-validator';

import { Type } from 'class-transformer';
import { IdDTO } from 'src/shared/dto';
export class roomDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => IdDTO)
  service: IdDTO;
}
