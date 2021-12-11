import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Service } from ".";

import {
    IsNotEmpty,
    ValidateNested,
    IsNotEmptyObject
  } from 'class-validator';

  import { Type } from 'class-transformer';
@Entity()
export class Course{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    @IsNotEmpty()
    name: string;

    @ManyToOne(type => Service, service => service.courses)
    @ValidateNested()
    @Type(() => Service)
    @IsNotEmptyObject()
    service: Service;
}