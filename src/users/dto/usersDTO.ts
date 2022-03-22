import {IsEmail, ValidateNested, IsNotEmpty, IsObject, MinLength, MaxLength, IsPhoneNumber } from 'class-validator';
import {Type} from 'class-transformer';
import { IdDTO } from 'src/shared/dto';
export class UsersDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(15)
  password: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phone: string;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => IdDTO)
  role: IdDTO;
}
