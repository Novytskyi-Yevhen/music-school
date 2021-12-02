import {ValidateNested, IsObject, IsNotEmptyObject} from 'class-validator';
import { Type } from 'class-transformer';
import { IdDTO } from 'src/public/dto';
export class TeacherDTO{
    @ValidateNested()
    @Type(() => IdDTO)
    @IsObject({each: true})
    @IsNotEmptyObject()
    instruments: IdDTO[];
}