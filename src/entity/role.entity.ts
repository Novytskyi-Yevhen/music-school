import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from ".";

@Entity()
export class Role{
    @PrimaryGeneratedColumn({type: 'int'})
    id: number;

    @Column('varchar', {length: 255})
    name: string;

    @Column('text', {array: true})
    availability: string[];

    @OneToMany(type => User, user => user.role)
    users: User[];

}