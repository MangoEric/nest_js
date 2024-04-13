import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(createBoardDto: CreateBoardDto) {
    const { title, description } = createBoardDto;

    const board: Board = {
      id: uuid(), // uuid 패키지를 사용하여 고유한 id 생성
      title, // title: title과 같은 의미
      description, // description: description과 같은 의미
      status: BoardStatus.PUBLIC
    }

    this.boards.push(board);
    return board; // 생성된 board를 반환
  }

  getBoardById(id: string): Board {
    const found = this.boards.find(board => board.id === id);

    if(!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return found;
  }

  deleteBoard(id: string): void {
    const found = this.getBoardById(id);
    this.boards = this.boards.filter(board => board.id !== found.id);
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
}
