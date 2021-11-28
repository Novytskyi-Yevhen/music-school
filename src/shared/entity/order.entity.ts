import {
  Column,
  Entity,
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

@Entity()
export class Order {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ManyToOne((type) => Service, (service) => service.orders)
  @ValidateNested()
  @Type(() => Service)
  @IsNotEmptyObject()
  @IsObject()
  service: Service;

  @Column('varchar')
  instrument: string;

  @Column('timestamp')
  @IsDate()
  @IsNotEmptyObject()
  date: Date;

  @Column('varchar')
  @IsNotEmpty()
  timeSlot: string;

  @Column('int')
  roomId: number;

  @ManyToOne((type) => User, (user) => user.orders)
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => User)
  user: User;
}
