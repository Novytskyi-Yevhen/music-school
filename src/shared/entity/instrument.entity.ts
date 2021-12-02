import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Teacher } from "./teacher.entity";

@Entity()
export class Instrument{
    @PrimaryGeneratedColumn({type: 'int'})
    id: number;

    @Column('varchar')
    name: string;

    @ManyToOne(() => Teacher, teacher => teacher.instruments)
    teacher: Teacher;
}