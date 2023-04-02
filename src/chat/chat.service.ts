import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async joinRoom(forwardedId: number, userId: number) {}
}
