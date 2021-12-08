import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from ".";
import {IsString, IsNotEmpty, IsInt} from 'class-validator';
@Entity()
export class File{
    @PrimaryGeneratedColumn({type: 'int'})
    id: number;

    @Column('varchar')
    @IsString()
    @IsNotEmpty()
    originalName: string;
    
    @Column('varchar')
    @IsString()
    @IsNotEmpty()
    mimeType: string;

    @Column('int')
    @IsInt()
    @IsNotEmpty()
    size: number;

    @Column('varchar')
    @IsString()
    @IsNotEmpty()
    redisKey: string;

    @ManyToOne(type => User, user => user.files)
    user: User;
}