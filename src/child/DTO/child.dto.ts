import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  MinLength,
  MaxLength,
  IsPhoneNumber,
  ValidateNested,
  IsArray,
  IsDate,
  IsNotEmptyObject,
  IsIn,
  IsString,
} from 'class-validator';

import { Type } from 'class-transformer';
import { IdDTO } from 'src/public/dto';
export class ChildDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['male', 'female'])
  gender: string;

  @IsDate()
  dayOfBirth: Date;

  @ValidateNested()
  @Type(() => IdDTO)
  @IsNotEmptyObject()
  user: IdDTO;
}
