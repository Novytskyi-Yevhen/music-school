import { GenericService } from 'src/shared/service';
import { Repository } from 'typeorm';
import { Chat } from 'src/shared/entity';
export declare class ChatService extends GenericService<Chat> {
    private chatRepository;
    constructor(chatRepository: Repository<Chat>);
    getGeneralChatId(): Promise<string>;
    getUserChats(chatsId: string[]): Promise<Chat[]>;
}
