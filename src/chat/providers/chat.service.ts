import { InjectRepository } from '@nestjs/typeorm';
import { GenericService } from 'src/public/service';
import { Repository } from 'typeorm';
import { Chat } from 'src/shared/entity';

export class ChatService extends GenericService<Chat> {
  constructor(
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
  ) {
    super(chatRepository);
  }
  async getGeneralChatId(){
      return await (await this.chatRepository.findOne({ where: {name: 'GeneralChat'}, select:['id']})).id;
  }
}
