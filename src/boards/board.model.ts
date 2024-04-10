export interface Board {
  id: string;
  title: string;
  description: string;
  status: BoardStatus;
}

// 공개글인지 비공개글인지 두 가지 상태를 가지는 enum으로 정의
export enum BoardStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE'
}