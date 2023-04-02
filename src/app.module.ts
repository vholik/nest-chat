import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [AuthModule, UsersModule, ChatModule, RoomsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
