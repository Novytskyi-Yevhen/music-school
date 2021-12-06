import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Chat, Child, Message, Order, Role } from '.';
import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  MinLength,
  MaxLength,
  IsPhoneNumber,
  ValidateNested,
  IsArray,
  IsString
} from 'class-validator';
import { Type } from 'class-transformer';
import { Teacher } from './teacher.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', {unique: true, nullable: true})
  @IsString()
  googleId: string;

  @Column('varchar', {unique: true, nullable: true})
  @IsString()
  facebookId: string;

  @Column('varchar')
  @IsNotEmpty()
  name: string;

  @Column('varchar', {nullable: true})
  @MinLength(5)
  @MaxLength(15)
  password: string;

  @Column('varchar')
  @IsEmail()
  email: string;

  @Column('varchar', {nullable: true})
  @IsPhoneNumber()
  phone: string;

  @OneToMany((type) => Order, (order) => order.user)
  @IsArray()
  @IsObject({each: true})
  orders: Order[];

  @OneToMany((type) => Child, (child) => child.user)
  @IsArray()
  @IsObject({each: true})
  childs: Child[];

  @ManyToOne((type) => Role, (role) => role.users, { eager: true })
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => Role)
  role: Role;

  @ManyToMany(() => Chat, chat => chat.users)
  @JoinTable()
  chats: Promise<Chat[]>;

  @OneToMany(() => Message, message => message.user)
  messages: Message[];

  @OneToOne(() => Teacher)
  @JoinTable()
  teacher: Teacher;
}
