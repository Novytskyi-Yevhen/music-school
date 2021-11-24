import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from ".";

@Entity()
export class Child{
    @PrimaryGeneratedColumn({type: 'int'})
    id: number;

    @Column('int')
    userId: number;

    @Column('varchar')
    name: string;

    @Column('varchar')
    gender: string;

    @Column('timestamp')
    dayOfBirth: Date

    @ManyToOne(type => User, user => user.childs)
    user: User;
}