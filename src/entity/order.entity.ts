import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Service, User } from ".";

@Entity()
export class Order{
    @PrimaryGeneratedColumn({type: "int"})
    id: number;

    @Column('int')
    userId: number;

    @Column('int')
    @OneToOne(type => Service, service => service.order)
    service: Service;

    @Column('varchar')
    instrument: string;

    @Column('int')
    teacherId: number;

    @Column('timestamp')
    date: Date;

    @Column('varchar')
    timeSlot: string;

    @Column('int')
    roomId: number;

    @ManyToOne(type => User, user => user.orders)
    user: User;
}