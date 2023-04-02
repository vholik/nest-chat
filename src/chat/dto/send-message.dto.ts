import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class SendMessageDto {
  @IsNotEmpty()
  @IsNumber()
  forwardedId: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  message: string;
}
