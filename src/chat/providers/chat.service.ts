import { InjectRepository } from '@nestjs/typeorm';
import { GenericService } from 'src/shared/service';
import { In, Repository } from 'typeorm';
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
  async getUserChats(chatsId: string[]){
      return await this.chatRepository.find({where: {id: In(chatsId)}})
  }
}
