import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto';
import JwtAuthenticationGuard from 'src/auth/jwt-authentication.guard';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  createRoom(@Body() dto: CreateRoomDto) {
    const { forwardedId } = dto;

    // return this.roomsService.createRoom();
  }
}
