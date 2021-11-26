import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Child, Order, Role } from '.';
import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  MinLength,
  MaxLength,
  IsPhoneNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IdDTO } from 'src/public.dto';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar')
  @IsNotEmpty()
  name: string;

  @Column('varchar')
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(15)
  password: string;

  @Column('varchar')
  @IsEmail()
  email: string;

  @Column('varchar')
  @IsPhoneNumber()
  phone: string;

  @OneToMany((type) => Order, (order) => order.user)
  orders: Order[];

  @OneToMany((type) => Child, (child) => child.user)
  childs: Child[];

  @ManyToOne((type) => Role, (role) => role.users, { eager: true })
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => IdDTO)
  role: Role;
}
