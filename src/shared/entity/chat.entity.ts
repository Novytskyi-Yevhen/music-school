import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Message, User } from '.';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @ManyToMany(() => User, (users) => users.chats)
  users: User[];

  @OneToMany(() => Message, (messages) => messages.chat, {eager: true})
  messages: Message[];
}
