import { GenericService } from 'src/shared/service';
import { Message } from 'src/shared/entity';
import { Repository } from 'typeorm';
export declare class MessageService extends GenericService<Message> {
    private messageRepository;
    constructor(messageRepository: Repository<Message>);
}
