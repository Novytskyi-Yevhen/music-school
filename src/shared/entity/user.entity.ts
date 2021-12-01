import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
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
  IsArray
} from 'class-validator';
import { Type } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar')
  @IsNotEmpty()
  name: string;

  @Column('varchar')
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(15)
  password: string;

  @Column('varchar')
  @IsEmail()
  email: string;

  @Column('varchar')
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
}
