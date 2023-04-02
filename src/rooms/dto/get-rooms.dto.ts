import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetRoomsDto {
  @IsNumber()
  @IsNotEmpty()
  page: number;

  @IsNumber()
  @IsNotEmpty()
  pageSize: number;
}
