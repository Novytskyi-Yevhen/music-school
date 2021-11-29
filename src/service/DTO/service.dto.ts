import { IsNotEmpty, IsIn, IsString } from 'class-validator';

export class ServiceDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsString()
  @IsIn(['trial', 'flexi', 'regular'])
  type: string;
}
