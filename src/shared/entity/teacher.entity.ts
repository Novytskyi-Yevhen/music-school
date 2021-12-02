import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Instrument } from "./instrument.entity";

@Entity()
export class Teacher{
    @PrimaryGeneratedColumn({type: 'int'})
    id: number;

    @OneToMany(() => Instrument, instrument => instrument.teacher)
    instruments: Instrument[];
}