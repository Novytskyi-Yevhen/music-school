import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Task } from ".";

@Entity()
export class Board{
    @PrimaryGeneratedColumn({type: 'int'})
    id: number;

    @Column('int')
    taskId: number;

    @Column('text')
    name: string

    @ManyToOne(type => Task, task => task.boards)
    task: Task;
}