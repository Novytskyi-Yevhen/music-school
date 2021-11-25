import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Board } from ".";

@Entity()
export class Task{
    @PrimaryGeneratedColumn({type: 'int'})
    id: number;

    @Column('varchar')
    name: string;

    @Column('varchar')
    description: string;

    @Column('varchar')
    type: string;

    @OneToMany(type => Board, board => board.task)
    boards: Board[];
}