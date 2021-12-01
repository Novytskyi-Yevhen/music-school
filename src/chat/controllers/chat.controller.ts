import { Controller } from '@nestjs/common';
import { AbstractCRUDController } from 'src/public/controllers';
import { Chat } from 'src/shared/entity';
import { ChatDTO } from '../DTO';
import { ChatService } from '../providers';

@Controller('chat')
export class ChatController extends AbstractCRUDController<
  ChatDTO,
  Chat,
  ChatService
> {
  constructor(private chatService: ChatService) {
    super(chatService, 'Chat');
  }
}
