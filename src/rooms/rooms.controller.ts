import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto, GetRoomsDto } from './dto';
import JwtAuthenticationGuard from 'src/auth/jwt-authentication.guard';
import { Request } from 'express';
import { User } from '@prisma/client';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  createRoom(@Body() dto: CreateRoomDto, @Req() req: Request) {
    const { forwardedId } = dto;

    const user = req.user as User;

    return this.roomsService.createRoom(forwardedId, user.id);
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  getRooms(@Body() dto: GetRoomsDto, @Req() req: Request) {
    const { page, pageSize } = dto;

    const user = req.user as User;

    return this.roomsService.getRooms(user.id, page, pageSize);
  }
}
