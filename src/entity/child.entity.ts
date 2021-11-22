import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from ".";

@Entity()
export class Child{
    @PrimaryGeneratedColumn({type: 'int'})
    id: number;

    @Column('int')
    userId: number;

    @Column('text')
    name: string;

    @Column('text')
    gender: string;

    @Column('timestamp')
    dayOfBirth: Date

    @ManyToOne(type => User, user => user.childs)
    user: User;
}