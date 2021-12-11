import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from ".";
import {
    IsEmail,
    IsNotEmpty,
    IsObject,
    MinLength,
    MaxLength,
    IsPhoneNumber,
    ValidateNested,
    IsArray,
    IsString,
    
  } from 'class-validator';
  
import { Type } from 'class-transformer';

@Entity()
export class Role{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', {length: 255, unique: true})
    @IsNotEmpty()
    name: string;

    @Column('text', {array: true})
    @IsString({each: true})
    @IsNotEmpty({each: true})
    availability: string[];

    @OneToMany(type => User, user => user.role)
    @ValidateNested({each: true})
    @Type(() => User)
    users: User[];

}