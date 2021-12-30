import { AbstractCRUDController } from 'src/shared/controllers';
import { Board } from 'src/shared/entity';
import { boardDTO } from '../DTO';
import { BoardService } from '../providers';
export declare class BoardController extends AbstractCRUDController<boardDTO, Board, BoardService> {
    private boardService;
    constructor(boardService: BoardService);
}
