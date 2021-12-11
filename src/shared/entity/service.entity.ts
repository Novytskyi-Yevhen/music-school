import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Course, Order, Room } from '.';
import { IsNotEmpty, IsIn } from 'class-validator';

@Entity()
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  @IsNotEmpty()
  name: string;

  @Column('varchar')
  description: string;

  @Column('varchar')
  @IsIn(['trial', 'flexi', 'regular'])
  type: string;

  @OneToMany((type) => Order, (order) => order.service)
  orders: Order[];

  @OneToMany((type) => Course, (course) => course.service)
  courses: Course[];

  @OneToMany((type) => Room, (room) => room.service)
  rooms: Room[];
}
