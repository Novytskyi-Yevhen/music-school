import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Child, Order } from ".";

@Entity()
export class User{
    @PrimaryGeneratedColumn({type: 'int', name: 'id'})
    id: number;

    @Column({type: 'text'}) 
    role: string;

    @Column("text", {array: true})
    availability: string[];

    @Column('text')
    name: string;

    @Column('text')
    password: string;

    @Column('text')
    email: string;

    @Column('text')
    phone: string;

    
    @OneToMany(type => Order, order => order.user)
    orders: Order[];

    @OneToMany(type => Child, child => child.user)
    childs: Child[];

}