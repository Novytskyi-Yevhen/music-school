import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Service } from '.';

import { IsNotEmpty, ValidateNested, IsNotEmptyObject } from 'class-validator';

import { Type } from 'class-transformer';
@Entity()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  @IsNotEmpty()
  name: string;

  @ManyToOne((type) => Service, (service) => service.rooms)
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => Service)
  service: Service;
}
