import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Instrument } from "./instrument.entity";

@Entity()
export class Teacher{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => Instrument, instrument => instrument.teacher)
    instruments: Instrument[];
}