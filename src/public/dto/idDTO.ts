import {IsInt, IsNotEmpty} from 'class-validator';
export class IdDTO{
    @IsInt()
    @IsNotEmpty()
    id: string;
}