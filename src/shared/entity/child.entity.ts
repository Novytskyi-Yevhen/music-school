import { Column, Entity, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order, User } from ".";
import {
    IsNotEmpty,
    ValidateNested,
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

    @OneToOne(() => Order)
    @JoinTable()
    order: Order;
}