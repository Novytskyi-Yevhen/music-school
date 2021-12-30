import { AbstractCRUDController } from 'src/shared/controllers';
import { Room } from 'src/shared/entity';
import { roomDTO } from '../DTO';
import { RoomService } from '../providers';
export declare class RoomController extends AbstractCRUDController<roomDTO, Room, RoomService> {
    private roomService;
    constructor(roomService: RoomService);
}
