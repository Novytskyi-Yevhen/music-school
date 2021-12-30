import { GenericService } from 'src/shared/service';
import { Room } from 'src/shared/entity';
import { Repository } from 'typeorm';
export declare class RoomService extends GenericService<Room> {
    private roomRepository;
    constructor(roomRepository: Repository<Room>);
}
