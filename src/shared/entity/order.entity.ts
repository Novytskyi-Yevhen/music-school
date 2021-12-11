import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Service, User } from '.';
import {
  IsNotEmpty,
  IsObject,
  ValidateNested,
  IsDate,
  IsNotEmptyObject,
} from 'class-validator';

import { Type } from 'class-transformer';
import { Instrument } from './instrument.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne((type) => Service, (service) => service.orders)
  @ValidateNested()
  @Type(() => Service)
  @IsNotEmptyObject()
  @IsObject()
  service: Service;

  @OneToOne(() => Instrument)
  @JoinTable()
  instrument: Instrument;

  @Column('timestamp')
  @IsDate()
  @IsNotEmptyObject()
  date: Date;

  @Column('varchar')
  @IsNotEmpty()
  timeSlot: string;

  @ManyToOne((type) => User, (user) => user.orders)
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => User)
  user: User;
}
