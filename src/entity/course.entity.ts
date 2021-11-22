import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Service } from ".";

@Entity()
export class Course{
    @PrimaryGeneratedColumn({type: 'int'})
    id: number;

    @Column('int')
    serviceId: number;

    @Column('text')
    name: string;

    @ManyToOne(type => Service, service => service.courses)
    course: Service;
}