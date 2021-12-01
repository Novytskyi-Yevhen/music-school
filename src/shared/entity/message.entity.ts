import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Chat, User } from '.';

@Entity()
export class Message {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ManyToOne(() => User, (user) => user.messages, {eager: true})
  user: User;

  @Column('varchar')
  text: string;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat: Chat;
}
