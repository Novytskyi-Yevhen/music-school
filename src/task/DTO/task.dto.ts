import { IsNotEmpty, IsString } from 'class-validator';
export class TaskDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;
}
