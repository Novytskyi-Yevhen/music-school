import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Board } from '.';

import { IsNotEmpty } from 'class-validator';
@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  @IsNotEmpty()
  name: string;

  @Column('varchar')
  description: string;

  @OneToMany((type) => Board, (board) => board.task)
  boards: Board[];
}
