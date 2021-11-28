import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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
    IsDate,
    IsNotEmptyObject,
    IsIn
  } from 'class-validator';

  import { Type } from 'class-transformer';
@Entity()
export class Child{
    @PrimaryGeneratedColumn({type: 'int'})
    id: number;

    @Column('varchar')
    @IsNotEmpty()
    name: string;

    @Column('varchar')
    @IsNotEmpty()
    @IsIn(['male', 'female'])
    gender: string;

    @Column('timestamp')
    @IsDate()
    dayOfBirth: Date

    @ManyToOne(type => User, user => user.childs)
    @ValidateNested()
    @Type(() => User)
    @IsNotEmptyObject()
    user: User;
}