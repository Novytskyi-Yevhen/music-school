import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Board } from ".";

@Entity()
export class Task{
    @PrimaryGeneratedColumn({type: 'int'})
    id: number;

    @Column('text')
    name: string;

    @Column('text')
    description: string;

    @Column('text')
    type: string;

    @OneToMany(type => Board, board => board.task)
    boards: Board[];
}