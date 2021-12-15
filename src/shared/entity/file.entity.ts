import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from ".";
import {IsString, IsNotEmpty, IsInt} from 'class-validator';
@Entity()
export class File{
    @PrimaryGeneratedColumn('uuid')
    id: string;

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
    awsLink: string;

    @Column('varchar')
    @IsString()
    awsKey: string;

    @Column('varchar')
    @IsString()
    redisKey: string;

    @ManyToOne(type => User, user => user.files, {eager: true})
    user: User;
}