import {
  IsNotEmpty,
  IsObject,
  ValidateNested,
  IsDate,
  IsNotEmptyObject,
  IsInt, IsString
} from 'class-validator';

import { Type } from 'class-transformer';
import { IdDTO } from 'src/shared/dto';

export class orderDTO {
  @ValidateNested()
  @Type(() => IdDTO)
  @IsNotEmptyObject()
  @IsObject()
  service: IdDTO;

  @IsString()
  instrument: string;

  @IsDate()
  @IsNotEmptyObject()
  date: Date;

  @IsNotEmpty()
  timeSlot: string;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => IdDTO)
  user: IdDTO;
}
