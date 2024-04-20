import { Controller, Get, Post, Body, Param, Delete, Patch, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.type';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Logger } from '@nestjs/common';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  private logger = new Logger('BoardsController');
  constructor(private boardsService: BoardsService) {}

  @Get()
  getAllBoards(): Promise<Board[]> {
    this.logger.verbose('Trying to all boards');
    return this.boardsService.getAllBoards();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User
    ): Promise<Board> {
      this.logger.verbose(`User "${user.username}" trying to create a new board. Data: ${JSON.stringify(createBoardDto)}`);
      return this.boardsService.createBoard(createBoardDto, user);
  }

  @Get('/id/:id')
  getBoardById(@Param('id', ParseIntPipe) id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @Delete('/id/:id')
  deleteBoard(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User
  ): Promise<void> {
    this.logger.verbose(`User "${user.username}" trying to delete a board. Board ID: ${id}`);
    return this.boardsService.deleteBoard(id, user);
  }

  @Patch('/id/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus
  ): Promise<Board> {
    return this.boardsService.updateBoardStatus(id, status);
  }

  @Get('/my')
  getMyBoards(
    @GetUser() user: User
  ): Promise<Board[]> {
    this.logger.verbose(`User "${user.username}" trying to get my boards`);
    return this.boardsService.getMyBoards(user);
  }
}
