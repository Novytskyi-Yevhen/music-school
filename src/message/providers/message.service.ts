import { InjectRepository } from '@nestjs/typeorm';
import { GenericService } from 'src/shared/service';
import { Message } from 'src/shared/entity';
import { Repository } from 'typeorm';

export class MessageService extends GenericService<Message> {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
  ) {
    super(messageRepository);
  }
}
