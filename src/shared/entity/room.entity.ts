import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Service } from ".";

@Entity()
export class Room{
    @PrimaryGeneratedColumn({type: 'int'})
    id: number;

    @Column('int')
    serviceId: number;

    @Column('varchar')
    name: string;

    @ManyToOne(type => Service, service => service.rooms)
    room: Service;
}