import {IsString, IsNotEmpty} from 'class-validator';
export class InstrumentDTO{
    @IsString()
    @IsNotEmpty()
    name: string;
}