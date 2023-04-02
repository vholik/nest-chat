import { IsNotEmpty, IsNumber } from 'class-validator';

export class JoinRoomDto {
  @IsNumber()
  @IsNotEmpty()
  roomId: number;
}
