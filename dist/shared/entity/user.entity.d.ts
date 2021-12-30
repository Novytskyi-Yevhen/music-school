import { Chat, Child, File, Message, Order, Role } from '.';
import { Teacher } from './teacher.entity';
export declare class User {
    id: string;
    googleId: string;
    facebookId: string;
    linkedinId: string;
    name: string;
    password: string;
    email: string;
    phone: string;
    orders: Order[];
    childs: Child[];
    role: Role;
    chats: Promise<Chat[]>;
    messages: Message[];
    teacher: Teacher;
    files: Promise<File[]>;
}
