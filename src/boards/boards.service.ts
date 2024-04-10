import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(title: string, description: string) {
    const board: Board = {
      id: uuid(), // uuid 패키지를 사용하여 고유한 id 생성
      title, // title: title과 같은 의미
      description, // description: description과 같은 의미
      status: BoardStatus.PUBLIC
    }

    this.boards.push(board);
    return board; // 생성된 board를 반환
  }
}
