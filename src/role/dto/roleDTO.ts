import {IsNotEmpty, IsString, IsArray } from 'class-validator';
export class RoleDTO{
    @IsNotEmpty()
    name: string;

    @IsString({each: true})
    @IsArray()
    availability: string[];
}