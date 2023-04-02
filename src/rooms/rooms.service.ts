import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';

@Injectable()
export class RoomsService {
  constructor(private readonly prisma: PrismaService) {}

  async createRoom(forwardedId: number, userId: number) {
    if (forwardedId === userId) {
      throw new HttpException('Users are the same', HttpStatus.BAD_REQUEST);
    }

    const room = await this.prisma.room
      .create({
        data: {
          users: {
            connect: [{ id: forwardedId }, { id: userId }],
          },
        },
      })
      .catch((err) => {
        throw new HttpException(
          `Error happened ${err}`,
          HttpStatus.BAD_REQUEST,
        );
      });

    return room;
  }

  async getRooms(userId: number, page: number, pageSize: number) {
    const rooms = await this.prisma.room.findMany({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
      skip: (page - 1) * pageSize,
    });

    return rooms;
  }
}
