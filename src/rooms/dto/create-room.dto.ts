import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRoomDto {
  @IsNumber()
  @IsNotEmpty()
  forwardedId: number;
}
