import { InjectRepository } from '@nestjs/typeorm';
import { GenericService } from 'src/public/service';
import { Board } from 'src/shared/entity';
import { Repository } from 'typeorm';

export class BoardService extends GenericService<Board> {
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>,
  ) {
    super(boardRepository);
  }
}
