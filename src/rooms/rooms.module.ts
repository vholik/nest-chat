import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [RoomsService],
  controllers: [RoomsController],
  imports: [PrismaModule],
})
export class RoomsModule {}
