import { InjectRepository } from '@nestjs/typeorm';
import { GenericService } from 'src/public/service';
import { Room } from 'src/shared/entity';
import { Repository } from 'typeorm';

export class RoomService extends GenericService<Room> {
  constructor(
    @InjectRepository(Room) private roomRepository: Repository<Room>,
  ) {
    super(roomRepository);
  }
}
