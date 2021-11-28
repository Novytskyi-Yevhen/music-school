import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from '.';

import { IsNotEmpty, ValidateNested, IsNotEmptyObject } from 'class-validator';

import { Type } from 'class-transformer';
@Entity()
export class Board {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column('varchar')
  @IsNotEmpty()
  name: string;

  @ManyToOne((type) => Task, (task) => task.boards)
  @ValidateNested()
  @Type(() => Task)
  @IsNotEmptyObject()
  task: Task;
}
