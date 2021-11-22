import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Course, Order, Room } from ".";

@Entity()
export class Service{
    @PrimaryGeneratedColumn({type: 'int'})
    id: number;

    @Column('text')
    name: string;

    @Column('text')
    description: string;

    @Column('text')
    type: string;

    @OneToOne(type => Order, order => order.service)
    order: Order;

    @OneToMany(type => Course, course => course.course)
    courses: Course[];

    @OneToMany(type => Room, room => room.room)
    rooms: Room[];
}