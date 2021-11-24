import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Child, Order, Role } from ".";

@Entity()
export class User{
    @PrimaryGeneratedColumn({type: 'int', name: 'id'})
    id: number;

    @Column('varchar')
    name: string;

    @Column('varchar')
    password: string;

    @Column('varchar')
    email: string;

    @Column('varchar')
    phone: string;

    
    @OneToMany(type => Order, order => order.user)
    orders: Order[];

    @OneToMany(type => Child, child => child.user)
    childs: Child[];

    @ManyToOne(type => Role, role => role.users)
    role: Role;

}