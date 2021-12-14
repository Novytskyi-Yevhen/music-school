import { Controller } from '@nestjs/common';
import { AbstractCRUDController } from 'src/shared/controllers';
import { Board } from 'src/shared/entity';
import { boardDTO } from '../DTO';
import { BoardService } from '../providers';

@Controller('board')
export class BoardController extends AbstractCRUDController<
  boardDTO,
  Board,
  BoardService
> {
  constructor(private boardService: BoardService) {
    super(boardService, 'Board');
  }
}
