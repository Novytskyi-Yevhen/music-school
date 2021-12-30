import { GenericService } from 'src/shared/service';
import { Board } from 'src/shared/entity';
import { Repository } from 'typeorm';
export declare class BoardService extends GenericService<Board> {
    private boardRepository;
    constructor(boardRepository: Repository<Board>);
}
