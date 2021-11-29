import { Controller } from '@nestjs/common';
import { AbstractCRUDController } from 'src/public/controllers';
import { Room } from 'src/shared/entity';
import { roomDTO } from '../DTO';
import { RoomService } from '../providers';

@Controller('room')
export class RoomController extends AbstractCRUDController<
  roomDTO,
  Room,
  RoomService
> {
  constructor(private roomService: RoomService) {
    super(roomService, 'Room');
  }
}
