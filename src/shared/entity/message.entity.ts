import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Chat, User } from '.';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.messages, {eager: true})
  user: User;

  @Column('varchar')
  text: string;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat: Chat;
}
